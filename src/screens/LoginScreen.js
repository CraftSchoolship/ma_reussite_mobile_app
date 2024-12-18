import React, { useState, useRef } from "react";
import {
  Box,
  Center,
  Text,
  View,
  VStack,
  HStack,
  Button,
  Spinner,
  Divider,
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import * as Linking from "expo-linking";
import {
  authenticateWithOAuth,
  authenticateWithUsernameAndPassword,
  read,
  browse,
} from "../../http/http";
import { storeObject, storeArray } from "../api/apiClient";
import config from "../../http/config";
import { CustomButton, CustomInput } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import { Formik } from "formik";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { loginValidationSchema } from "../validation/formValidation";

const LoginScreen = () => {
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
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
        [["parent_id", "=", connectedUser.craft_parent_id[0]]]
      );

      const studentIds = fetchedChildren.map(
        (fetchedChild) => fetchedChild.child_id[0]
      );
      const childrenList = await browse(
        "craft.student",
        ["id", "name", "contact_id", "image_256"],
        [["id", "in", studentIds]]
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
        console.error("User data fetch error:", userResponse);
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

      // Navigate to the next screen upon successful login
      navigation.navigate("DrawerNavigator", { connectedUser });
    } catch (err) {
      console.error("Login Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setIsLoadingOAuth(true);
    setError("");

    try {
      const redirectUrl = Linking.createURL("/");
      const authUrl = `${provider.url}?redirect_uri=${encodeURIComponent(
        redirectUrl
      )}`;

      const result = await Linking.openAuthSessionAsync(authUrl, redirectUrl);

      if (result.type === "success" && result.url) {
        const urlParams = new URLSearchParams(result.url.split("?")[1]);
        const oauthToken = urlParams.get("token");

        if (!oauthToken) {
          setError("OAuth login failed. No token received.");
          return;
        }

        const isAuthenticated = await authenticateWithOAuth(
          provider.name.toLowerCase(),
          oauthToken
        );

        if (!isAuthenticated) {
          setError("OAuth login failed. Please try again.");
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

        if (!user || !user[0]) {
          setError("Oops! Something went wrong.");
          return;
        }

        let profileImage = user[0]?.image_256 || null;
        let connectedUser = {
          ...user[0],
          email: email,
          password: password,
          profileImage: wrapProfileImageBase64(profileImage),
          role: user[0].craft_role,
        };

        await storeObject("connectedUser", connectedUser);
        navigation.navigate("DrawerNavigator", { connectedUser });
      } else {
        setError("OAuth login canceled.");
      }
    } catch (err) {
      console.error("OAuth Login Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoadingOAuth(false);
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
                inputRef={input1Ref}
                onSubmitEditing={() => input2Ref.current.focus()}
                clearButtonMode="always"
              />
              <CustomInput
                label="Mot de passe"
                name="password"
                secureTextEntry
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                inputRef={input2Ref}
                onSubmitEditing={handleSubmit}
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
    </View>
  );
};
export default LoginScreen;
