import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Box, StatusBar, Text, useToast, VStack } from "native-base";
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
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [connectedUser, setConnectedUser] = useState({
    sessionId: "",
    email: "",
    password: "",
    userid: "",
    role: "",
  });
  const [selectedChild, setSelectedChild] = useState(null);
  const [children, setChildren] = useState([]);

  const getStudentIds = (data) => {
    return data.map((fetchedChild) => fetchedChild.child_id[0]);
  };

  const handleLogin = async (values) => {
    setLoading(false);
    const email = values.email;
    const password = values.password;

    try {
      const sessionId = await authenticate(email, password);

      if (sessionId) {
        const user = await jsonrpcRequest(
          sessionId,
          password,
          config.model.users,
          [[["email", "=", email]]],
          ["self", "craft_role", "image_1024", "name", "phone", "street"]
        );

        if (user.length > 0) {
          const userid = user[0].self;
          const role = user[0].craft_role;
          const imageUri = user[0].image_1024;
          const name = user[0].name;
          const phone = user[0].phone;
          const street = user[0].street;

          let userData;
          switch (role) {
            case "student":
              userData = await jsonrpcRequest(
                sessionId,
                password,
                config.model.craftStudent,
                [[["contact_id", "in", userid]]],
                ["image_1024"]
              );
              break;

            case "parent":
              userData = await jsonrpcRequest(
                sessionId,
                password,
                config.model.craftParent,
                [[["contact_id", "in", userid]]],
                ["image_1024"]
              );
              break;

            case "teacher":
              userData = await jsonrpcRequest(
                sessionId,
                password,
                config.model.craftTeachers,
                [[["work_contact_id", "in", userid]]],
                ["image_1024"]
              );
              break;

            default:
              userData = await jsonrpcRequest(
                sessionId,
                password,
                config.model.users,
                [[["partner_id", "in", userid]]],
                ["image_1024"]
              );
              break;
          }

          const profileImage = imageUri
            ? `data:image/png;base64,${imageUri}`
            : null;

          setError("");

          await storeObject("connectedUser", {
            sessionId: sessionId,
            email: email,
            password: password,
            userid: userid,
            role: role,
            profileImage: profileImage,
            name: name,
            phone: phone,
            street: street,
          });

          setConnectedUser({
            sessionId: sessionId,
            email: email,
            password: password,
            userid: userid,
            role: role,
            profileImage: profileImage,
            name: name,
            phone: phone,
            street: street,
          });
        }
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect !");
      }
    } catch (error) {
      console.error("Odoo JSON-RPC Error:", error);
      setError("Nom d'utilisateur ou mot de passe incorrect !");
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    if (connectedUser?.role !== "parent") return;

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

        if (!parent.length || !parent[0].child_ids.length) return;

        const parentChildIds = parent[0].child_ids;

        const fetchedChildren = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.craftParentChildLine,
          [[["id", "=", parentChildIds]]],
          ["child_id", "id"]
        );

        const studentIds = getStudentIds(fetchedChildren);

        const childrenList = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.craftStudent,
          [[["id", "=", studentIds]]],
          ["id", "contact_id", "image_1024"]
        );

        setChildren(childrenList);
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
        console.error("Error fetching role:", error);
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
  }, [connectedUser, selectedChild]);

  return (
    <SafeAreaView flex={1}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <LoginScreenBanner />
      <Box height={"100%"}>
        <VStack
          width={"full"}
          minH={"80%"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box mx={"auto"} width="80%" display={"flex"}>
            <Box alignItems="center">
              <Text color={"black"} fontSize="2xl" bold>
                S'identifier
              </Text>
            </Box>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={loginValidationSchema}
              onSubmit={handleLogin}
            >
              {({ handleSubmit, isValid }) => (
                <>
                  <CustomInput
                    label="Email"
                    name="email"
                    keyboardType="email-address"
                    inputRef={input1Ref}
                    onSubmitEditing={() => input2Ref.current.focus()}
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
                </>
              )}
            </Formik>
          </Box>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default LoginScreen;
