import React, { useState } from "react";
import { Box, Center, Text, View, VStack, HStack, Divider, Toast } from "native-base";
import { useThemeContext } from "../hooks/ThemeContext";
import { Formik } from "formik";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { loginValidationSchema } from "../validation/formValidation";
import { CustomButton, CustomInput } from "../components";
import { authenticate } from "../utils/authLogic";
import { authenticateWithUsernameAndPassword, authenticateWithOAuth } from "../../http/http";
import config from "../../http/config";
import microsoftIcon from "../../assets/images/microsoft.png";
import * as WebBrowser from 'expo-web-browser';
import { useAuth } from "../utils/AuthContext";
import { getUserInfo } from "../utils/authLogic";

const LoginScreen = () => {
  const [error, setError] = useState("");
  const navigation = useAuth();
  const { isDarkMode } = useThemeContext();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);

  const provider=config.auth.providers[0];
  if (config.debug) {
    provider.url = provider.url.replace("mareussite%3A%2F%2F", "exp%3A%2F%2F127.0.0.1%3A8081%2F--%2F");
  }

  const handleLogin = async (values) => {
    setIsLoginLoading(true);
    setIsOAuthLoading(false);
    setError("");
    const { success, error: authError } = await authenticate(
      authenticateWithUsernameAndPassword,
      values.email,
      values.password
    );
    if (success) {
      const connectedUser = await getUserInfo();
      if (connectedUser) {
        navigation.navigate("DrawerNavigator", { connectedUser });
      } else {
        setError("Failed to fetch user info.");
      }
    } else {
      setError(authError);
    }
    setIsLoginLoading(false);
  };

  const handleOAuthLogin = async () => {
     try {
      setIsOAuthLoading(true);
      const handleRedirect = async ({ url }) => {

          var l = new URL(url);
          var s = l.search;
          var q = l.hash.substring(1);
          var r = '/sso' + l.search;
          if(q.length !== 0) {
              r += s ? (s === '?' ? '' : '&') : '?';
              r += q;
          }

          const parsedUrl = new URL('http://example.com' + r); // the domain name does not matter here
          const token = parsedUrl.searchParams.get("access_token");

          const { success } = await authenticate(authenticateWithOAuth, provider.id, token);
          if (success) {
            const connectedUser = await getUserInfo();
            if (connectedUser) {
              navigation.navigate("DrawerNavigator", { connectedUser });
            } else {
              setError("Failed to fetch user info.");
            }
          }
        }
        let result = await WebBrowser.openAuthSessionAsync(provider.url, new URL(provider.url).searchParams.get('redirect_uri'),);
        console.log(result);
        if (result.type == 'success')
          await handleRedirect(result);

      } catch (error) {
        Toast.show({
          title: "Error",
          description: error.message || "An error occurred during login",
          status: "error",
          placement: "top",
        });
      } finally {
        setIsOAuthLoading(false);
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
                <CustomButton
                  onPress={() => handleOAuthLogin()}
                  title="Continuer avec Microsoft"
                  loading={isOAuthLoading} // Only OAuth loading
                  isMicrosoftButton={true}
                  isDarkMode={isDarkMode}
                  icon={microsoftIcon}
                 />
                </VStack>
              </VStack>
            )}
          </Formik>
        </Box>
    </View>
  );
};

export default LoginScreen;