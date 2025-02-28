import React, { useState } from "react";
import { Box, Center, Text, View, VStack, HStack, Spinner, Divider } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../hooks/ThemeContext";
import { Formik } from "formik";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { loginValidationSchema } from "../validation/formValidation";
import { CustomButton, CustomInput } from "../components";
import { authenticate } from "../utils/authLogic";
import { authenticateWithUsernameAndPassword, authenticateWithOAuth } from "../../http/http";
import config from "../../http/config";
import microsoftIcon from "../../assets/images/microsoft.png";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = () => {
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const { isDarkMode } = useThemeContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);


  const handleLogin = async (values) => {
    setIsLoginLoading(true); // Set only login loading
    setIsOAuthLoading(false);
    setError("");

    const {
      success,
      connectedUser,
      error: authError,
    } = await authenticate(
      authenticateWithUsernameAndPassword,
      values.email,
      values.password
    );

    if (success) {
      navigation.navigate("DrawerNavigator", { connectedUser });
    } else {
      setError(authError);
    }
    setIsLoginLoading(false); // Reset only login loading
  };

  const handleOAuthLogin = async (provider) => {
    try {
      setIsOAuthLoading(true); // Set only OAuth loading
      setIsLoginLoading(false);

  const handleUrlChange = async ({ url }) => {
    if (!url) return;
    console.log("Redirected URL:", url);
    if (url.startsWith("exp://127.0.0.1:8081/--/")) {
      let tempUrl = url.substring(24);
      tempUrl = tempUrl.startsWith("?expo#") || tempUrl.startsWith("?expo?") ? "?" + tempUrl.substring(6) : tempUrl;
      url = "https://app.craftschoolship.com/" + tempUrl;
    }

    if (url.startsWith("https://app.craftschoolship.com/")) {
      let tempUrl = url.substring(31);
      tempUrl = tempUrl.startsWith("#") || tempUrl.startsWith("/#") ? tempUrl.replace("#", "?") : tempUrl;

      let parsedUrl = new URL("https://app.craftschoolship.com/" + tempUrl);

      if (!config.debug)
      parsedUrl = new URL("https://app.craftschoolship.com/oauth.html" + tempUrl);
      const token = parsedUrl.searchParams.get("access_token");
      const provider = JSON.parse(parsedUrl.searchParams.get("state"))["p"];
      console.log("Extracted provider: ", provider);
      console.log("Extracted token: ", token);

      if (token) {
        await AsyncStorage.setItem("erp_token", token);
        const { success, connectedUser } = await authenticate(authenticateWithOAuth, provider, token);

      if (success) {
        navigation.navigate("DrawerNavigator", { connectedUser });
        } else {
          setError("Authentication failed.");
        }
      } else {
        setError("Authentication token not found in redirect URL.");
      }
    }
    setIsOAuthLoading(false); // Reset only OAuth loading

  };
  const subscription = Linking.addEventListener("url", handleUrlChange);

  await Linking.openURL(provider.url);

  return () => subscription.remove();
} catch (error) {
  toast.show({
    title: "Error",
    description: error.message || "An error occurred during login",
    status: "error",
    placement: "top",
  });
} finally {
  setIsOAuthLoading(false); // Ensure only OAuth loading is reset
}
};


  return (
    <View
      flex={1}
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White
      }
    >
        <Box style={{ padding: 24, marginTop: 35 }}>
          <Center>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              fontSize="2xl"
              bold
            >
              S'identifier
            </Text>
          </Center>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit, isValid }) => (
              <VStack space={4} marginTop={10}>
                <CustomInput
                  label="Email"
                  name="email"
                  keyboardType="email-address"
                />
                <CustomInput
                  label="Mot de passe"
                  name="password"
                  secureTextEntry
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <Text color={"danger.500"} textAlign={"center"} mt={3}>
                  {error}
                </Text>
                <CustomButton
                  onPress={handleSubmit}
                  title="Se connecter"
                  isDisabled={!isValid}
                  loading={isLoginLoading} // Only login loading
                  />

                <HStack alignItems="center" mt={6}>
                  <Divider flex={1} bg="gray.400" />
                  <Text mx={3} color="gray.400">
                    ou
                  </Text>
                  <Divider flex={1} bg="gray.400" />
                </HStack>
                <VStack mt={6}>
                  {config.auth.providers
                    .filter(
                      (provider) => provider.name.toLowerCase() === "microsoft"
                    )
                    .map((provider) => (
                      <CustomButton
                        key={provider.url}
                        onPress={() => handleOAuthLogin(provider)}
                        title="Continuer avec Microsoft"
                        loading={isOAuthLoading} // Only OAuth loading
                        isMicrosoftButton={true}
                        isDarkMode={isDarkMode}
                        icon={microsoftIcon}
                      />
                    ))}
                </VStack>
              </VStack>
            )}
          </Formik>
        </Box>
    </View>
  );
};

export default LoginScreen;
