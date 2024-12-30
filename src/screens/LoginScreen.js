import React, { useState, useRef, useEffect } from "react";
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import {
  authenticateWithOAuth,
  authenticateWithUsernameAndPassword,
  read,
  browse,
} from "../../http/http";
import { storeObject, storeArray } from "../api/apiClient";
import config from "../../http/config";
import { WebView } from "react-native-webview";
import { CustomButton, CustomInput } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import { Formik } from "formik";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { loginValidationSchema } from "../validation/formValidation";

const LoginScreen = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const [authUrl, setAuthUrl] = useState("");
  const [isLoadingOAuth, setIsLoadingOAuth] = useState(false);
  const [error, setError] = useState("");
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const navigation = useNavigation();
  const { isDarkMode } = useThemeContext();
  const [showPassword, setShowPassword] = useState(false);

  const wrapProfileImageBase64 = (profileImage) => {
    if (!profileImage || typeof profileImage !== "string")
      return config.baseUrl + "/base/static/img/avatar.png";

    if (profileImage.startsWith("iVBORw0K"))
      return `data:image/png;base64,${profileImage}`;

    if (profileImage.startsWith("/9j/"))
      return `data:image/jpeg;base64,${profileImage}`;

    if (
      profileImage.startsWith("PHN2Zy") ||
      profileImage.startsWith("PD94bWwg")
    )
      return `data:image/svg+xml;base64,${profileImage}`;

    console.log("Unknown image type");
    return config.baseUrl + "/base/static/img/avatar.png";
  };

  const getCurrencies = async () => {
    try {
      const currencies = await browse("res.currency", ["id", "symbol"]);
      await storeObject("currencies", currencies);
    } catch (error) {
      console.error("Error fetching currency:", error);
    }
  };

  const loadParentData = async (connectedUser) => {
    try {
      const fetchedChildren = await browse(
        "craft.parent.child.line",
        ["child_id"],
        {
          parent_id: connectedUser.craft_parent_id[0],
        }
      );

      const studentIds = fetchedChildren.map(
        (fetchedChild) => fetchedChild.child_id[0]
      );
      const childrenList = await browse(
        "craft.student",
        ["id", "name", "contact_id", "image_256"],
        {
          id_in: studentIds.join(","),
        }
      );

      childrenList.forEach(
        (student) =>
          (student.image_256 = wrapProfileImageBase64(student.image_256))
      );
      const initialSelectedChild = childrenList.length ? childrenList[0] : null;

      await storeArray("children", childrenList);
      await storeObject("selectedChild", initialSelectedChild);
    } catch (error) {
      console.error("Error fetching children data:", error);
    }
  };

  const handleLogin = async (values) => {
    setIsLoadingLogin(true);
    setError("");
    const email = values.email;
    const password = values.password;

    try {
      const isAuthenticated = await authenticateWithUsernameAndPassword(
        email,
        password
      );
      console.log("Authentication result:", isAuthenticated);
      if (!isAuthenticated) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      const token = await AsyncStorage.getItem("erp_token");
      const user_id = await AsyncStorage.getItem("erp_user_id");

      if (!token || !user_id) {
        setError("Authentication failed. Please try again.");
        return;
      }

      const user = await read(
        "res.users",
        [user_id],
        [
          "self",
          "name",
          "phone",
          "login",
          "street",
          "craft_role",
          "craft_parent_id",
          "craft_student_id",
          "image_256",
        ]
      );

      if (!user) {
        setError("Failed to fetch user data.");
        console.error("User data fetch error:", user);
        return;
      }

      let profileImage = user.image_256 || null;
      let connectedUser = {
        ...user,
        email: email,
        password: password,
        profileImage: wrapProfileImageBase64(profileImage),
        role: user.craft_role,
      };

      await storeObject("connectedUser", connectedUser);

      // Load additional data based on user role
      if (connectedUser?.role) {
        await getCurrencies();
        if (
          connectedUser?.role === "parent" &&
          connectedUser?.craft_parent_id
        ) {
          await loadParentData(connectedUser);
        }
      }

      navigation.navigate("DrawerNavigator", { connectedUser });
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    const authUrl = provider.url;
    setAuthUrl(authUrl);
    setIsWebViewVisible(true);
  };

  const handleWebViewNavigation = async (event) => {
    const { url } = event;

    if (url.startsWith("https://app.craftschoolship.com")) {
      setIsWebViewVisible(false);
      let temp_url = url.substring(31);
      if (temp_url.startsWith("#") || temp_url.startsWith("/#")) {
        temp_url = temp_url.replace("#", "?");
      }
      const parsedUrl = new URL("https://app.craftschoolship.com" + temp_url);
      const token = parsedUrl.searchParams.get("access_token");
      console.log("Extracted Token:", token);

      if (token) {
        try {
          const providerName = config.auth.providers[0].id;
          const isAuthenticated = await authenticateWithOAuth(
            providerName,
            token
          );

          if (!isAuthenticated) {
            setError("OAuth login failed. Please try again.");
            return;
          }

          const erpToken = await AsyncStorage.getItem("erp_token");
          const user_id = await AsyncStorage.getItem("erp_user_id");
          console.log("SSO Token:", token);
          console.log("SSO User ID:", user_id);

          if (!erpToken || !user_id) {
            setError("Authentication failed. Please try again.");
            console.error("ERP token or user_id not found.");
            return;
          }

          const user = await read(
            "res.users",
            [user_id],
            [
              "self",
              "name",
              "phone",
              "login",
              "street",
              "craft_role",
              "craft_parent_id",
              "craft_student_id",
              "image_256",
            ]
          );

          if (!user) {
            setError("Failed to fetch user data.");
            return;
          }

          let profileImage = user.image_256 || null;
          let connectedUser = {
            ...user,
            profileImage: wrapProfileImageBase64(profileImage),
            role: user.craft_role,
          };

          await storeObject("connectedUser", connectedUser);

          navigation.navigate("DrawerNavigator", { connectedUser });
        } catch (err) {
          console.error("OAuth Handling Error:", err);
          setError("An error occurred. Please try again.");
        }
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
                  loading={isLoadingLogin}
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
                      loading={isLoadingOAuth}
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
