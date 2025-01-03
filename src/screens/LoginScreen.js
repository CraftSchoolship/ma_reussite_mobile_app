import React, { useState } from "react";
import {
  Box,
  Center,
  Text,
  View,
  VStack,
  HStack,
  Spinner,
  Divider,
} from "native-base";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../hooks/ThemeContext";
import { Formik } from "formik";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { loginValidationSchema } from "../validation/formValidation";
import { CustomButton, CustomInput } from "../components";
import { authenticate } from "../utils/authLogic";
import {
  authenticateWithUsernameAndPassword,
  authenticateWithOAuth,
} from "../../http/http";
import config from "../../http/config";

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState({ login: false, oauth: false });
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const [authUrl, setAuthUrl] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const { isDarkMode } = useThemeContext();

  const handleLogin = async (values) => {
    setIsLoading((prev) => ({ ...prev, login: true }));
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
    setIsLoading((prev) => ({ ...prev, login: false }));
  };

  const handleOAuthLogin = (provider) => {
    setAuthUrl(provider.url);
    setIsWebViewVisible(true);
  };

  const handleWebViewNavigation = async (event) => {
    const { url } = event;

    if (url.startsWith("https://app.craftschoolship.com")) {
      setIsWebViewVisible(false);
      let tempUrl = url.substring(31);
      tempUrl =
        tempUrl.startsWith("#") || tempUrl.startsWith("/#")
          ? tempUrl.replace("#", "?")
          : tempUrl;

      const parsedUrl = new URL("https://app.craftschoolship.com" + tempUrl);
      const token = parsedUrl.searchParams.get("access_token");

      if (token) {
        setIsLoading((prev) => ({ ...prev, oauth: true }));
        const {
          success,
          connectedUser,
          error: authError,
        } = await authenticate(
          authenticateWithOAuth,
          config.auth.providers[0].id,
          token
        );

        if (success) {
          navigation.navigate("DrawerNavigator", { connectedUser });
        } else {
          setError(authError);
        }
        setIsLoading((prev) => ({ ...prev, oauth: false }));
      } else {
        setError("Authentication failed. No token received.");
      }
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
      {isWebViewVisible ? (
        <WebView
          source={{ uri: authUrl }}
          onNavigationStateChange={handleWebViewNavigation}
          startInLoadingState
          renderLoading={() => (
            <Center flex={1}>
              <Spinner size="lg" color={MA_REUSSITE_CUSTOM_COLORS.Primary} />
            </Center>
          )}
        />
      ) : (
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
                />
                <Text color={"danger.500"} textAlign={"center"} mt={3}>
                  {error}
                </Text>
                <CustomButton
                  onPress={handleSubmit}
                  title="Se connecter"
                  isDisabled={!isValid}
                  loading={isLoading.login}
                />

                <HStack alignItems="center" mt={6}>
                  <Divider flex={1} bg="gray.400" />
                  <Text mx={3} color="gray.400">
                    ou
                  </Text>
                  <Divider flex={1} bg="gray.400" />
                </HStack>

                {config.auth.providers
                  .filter(
                    (provider) => provider.name.toLowerCase() === "microsoft"
                  )
                  .map((provider) => (
                    <CustomButton
                      key={provider.url}
                      onPress={() => handleOAuthLogin(provider)}
                      title="Continuer avec Microsoft"
                      loading={isLoading.oauth}
                    />
                  ))}
              </VStack>
            )}
          </Formik>
        </Box>
      )}
    </View>
  );
};

export default LoginScreen;
