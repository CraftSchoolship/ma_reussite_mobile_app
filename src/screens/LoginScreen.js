import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Box, Center, Text, View, VStack, Button, Spinner } from "native-base";
import React, { useRef, useState } from "react";
import config from "../../http/config";
import { authenticate, browse, read } from "../../http/http";
import { storeArray, storeObject } from "../api/apiClient";
import { CustomButton, CustomInput } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { loginValidationSchema } from "../validation/formValidation";

const wrapProfileImageBase64 = (profileImage) => {
  if (!profileImage || typeof profileImage !== "string")
    return config.baseUrl + "/base/static/img/avatar.png";

  if (profileImage.startsWith("iVBORw0K"))
    return `data:image/png;base64,${profileImage}`;

  if (profileImage.startsWith("/9j/"))
    return `data:image/jpeg;base64,${profileImage}`;

  if (profileImage.startsWith("PHN2Zy") || profileImage.startsWith("PD94bWwg"))
    return `data:image/svg+xml;base64,${profileImage}`;

  console.log("Unknown image type");
  return config.baseUrl + "/base/static/img/avatar.png";
};

const LoginScreen = () => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useThemeContext();

  const getCurrencies = async () => {
    try {
      const currencies = await browse("res.currency", ["id", "symbol"]);

      storeObject("currencies", currencies);
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
      console.error("Error fetching events:", error);
    }
  };

  const handleLogin = async (values) => {
    setLoading(true);
    const email = values.email;
    const password = values.password;

    try {
      const user_id = await authenticate(email, password);

      // if connection failed return
      if (!user_id) {
        setError("Nom d'utilisateur ou mot de passe incorrect !");
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
        setError("Oops! Quelque chose s'est mal passée");
        return;
      }

      let connectedUser = {
        ...user[0],
        email: email,
        password: password,
        profileImage: wrapProfileImageBase64(user[0].image_256), //config.baseUrl + `/web/image?model=res.users&id=${user_id}&field=image_1920&timestamp=${new Date().getTime()}`,
        role: user[0].craft_role,
      };

      await storeObject("connectedUser", connectedUser);

      // Load additional date
      if (connectedUser?.role) await getCurrencies();
      if (
        connectedUser?.role === "parent" &&
        connectedUser?.craft_parent_id?.length
      )
        await loadParentData(connectedUser);

      // go home
      navigation.navigate("DrawerNavigator", { connectedUser });
    } catch (error) {
      console.error("Odoo JSON-RPC Error:", error);
      setError("Nom d'utilisateur ou mot de passe incorrect !");
    } finally {
      setLoading(false);
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
                loading={loading}
              />
            </VStack>
          )}
        </Formik>
      </Box>
    </View>
  );
};

export default LoginScreen;
