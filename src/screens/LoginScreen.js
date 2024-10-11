import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import {
  Box,
  Center,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Text,
  useToast,
  View,
  VStack,
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import {
  authenticate,
  jsonrpcRequest,
  storeArray,
  storeObject,
} from "../api/apiClient";
import config from "../api/config";
import { CustomButton, CustomInput, LoginScreenBanner } from "../components";
import { loginValidationSchema } from "../validation/formValidation";

const LoginScreen = () => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [connectedUser, setConnectedUser] = useState({
    uid: "",
    email: "",
    password: "",
    self: "",
    role: "",
  });
  const [selectedChild, setSelectedChild] = useState({});
  const [children, setChildren] = useState([]);

  const getStudentIds = (data) => {
    return data.map((fetchedChild) => fetchedChild.child_id[0]);
  };

  const handleLogin = async (values) => {
    setLoading(false);
    const email = values.email;
    const password = values.password;

    try {
      const sessionId = await authenticate(username, password);

      if (sessionId > 0) {
        const user = await jsonrpcRequest(
          sessionId,
          password,
          config.model.users,
          [[["email", "=", username]]],
          ["self", "craft_role"]
        );

        if (user.length > 0) {
          const userid = user[0].self;
          setError("");
          const role = user[0].craft_role;

          await storeObject("connectedUser", {
            sessionId: sessionId,
            email: username,
            password: password,
            userid: userid,
            role: role,
          });

          setConnectedUser({
            sessionId: sessionId,
            email: username,
            password: password,
            userid: userid,
            role: role,
          });
        }
      } else {
        console.log("No image available or image is not in the correct format");
        // You can assign a default image or handle it as needed
        profileImage = "default-image-url-or-placeholder";
      }
      // if (profileImage.startsWith("iVBORw0K"))
      //   profileImage = `data:image/png;base64,${profileImage}`;
      // else if (profileImage.startsWith("/9j/"))
      //   profileImage = `data:image/jpeg;base64,${profileImage}`;
      // else if (
      //   profileImage.startsWith("PHN2Zy") ||
      //   profileImage.startsWith("PD94bWwg")
      // )
      //   profileImage = `data:image/svg+xml;base64,${profileImage}`;
      // else console.log("Unknow Image type");

      let connectedUser = {
        ...user[0],
        email: email,
        password: password,
        profileImage: profileImage, //config.baseUrl + `/web/image?model=res.users&id=${user_id}&field=image_1920&timestamp=${new Date().getTime()}`,
        role: user[0].craft_role,
      };

      await storeObject("connectedUser", connectedUser);
      setConnectedUser(connectedUser);
    } catch (error) {
      console.error("Odoo JSON-RPC Error:", error);
      setError("Nom d'utilisateur ou mot de passe incorrect !");
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (connectedUser?.role !== "parent") return;

    //TODO: FIX: This code is not working as expected

    const loadParentData = async () => {
      try {
        if (!connectedUser) return;

        const parent = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.craftParent,
          [[["email", "=", connectedUser.email]]],
          ["id", "child_ids"]
        );

        if (!fetchedChildren.length) return;

        const parentChildIds = parent[0].child_ids;

        const fetchedChildren = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.craftParentChildLine,
          [[["id", "=", parentChildIds]]],
          ["child_id", "id"]
        );

        const studentIds = getStudentIds(fetchedChildren);
        console.log(studentIds);

        const childrenList = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.craftStudent,
          [[["id", "=", studentIds]]],
          ["id", "contact_id"]
        );

        if (!childrenList.length) return;

        const initialSelectedChild = childrenList[0];
        setSelectedChild(initialSelectedChild);

        await storeArray("children", childrenList);
        await storeObject("selectedChild", initialSelectedChild);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (connectedUser?.role) loadParentData();
  }, [connectedUser]);

  useEffect(() => {
    const getCurrencies = async () => {
      try {
        const currencies = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.resCurrency,
          [],
          ["id", "symbol"]
        );

        storeObject("currencies", currencies);
      } catch (error) {
        console.error("Error fetching currency:", error);
      }
    };

    if (connectedUser?.role) getCurrencies();
  }, [connectedUser]);

  useEffect(() => {
    if (connectedUser?.role === "parent" && selectedChild) {
      navigation.navigate("DrawerNavigator", { connectedUser });
    } else if (connectedUser?.role) {
      navigation.navigate("DrawerNavigator", { connectedUser });
    }
  }, [children, selectedChild, connectedUser]);

  return (
    <View flex="1">
      <LoginScreenBanner />

      <Box style={{ flex: 1, padding: 58, marginTop: 35 }}>
        <Center>
          <Text color={"black"} fontSize="2xl" bold>
            S'identifier
          </Text>
        </Center>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ handleSubmit, isValid }) => (
            <VStack space={10} marginTop={10}>
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
              {error ? (
                <Text color={"danger.500"} textAlign={"center"} mt={3}>
                  {error}
                </Text>
              ) : null}
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
