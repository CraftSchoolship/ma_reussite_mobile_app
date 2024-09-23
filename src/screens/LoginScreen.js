import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Box, Center, StatusBar, Text, View, VStack } from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { storeArray, storeObject } from "../api/apiClient";
import config from "../../http/config";
import { authenticate, browse, read } from "../../http/http";
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
        profileImage:
          config.baseUrl +
          `/web/image?model=res.users&id=${user_id}&field=image_1920'`,
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

        const parent = await read(
          "craft.parent",
          [connectedUser.craft_parent_id],
          ["id", "child_ids"]
        );

        if (!parent.length || !parent[0].child_ids.length) return;

        const fetchedChildren = await browse(
          "craft.parent.child.line",
          ["child_id", "id"],
          [[["parent_id", "=", connectedUser.craft_parent_id]]]
        );

        const studentIds = getStudentIds(fetchedChildren);

        const childrenList = await browse(
          "craft.student",
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
        const currencies = await browse("res.currency", ["id", "symbol"]);

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
  }, [connectedUser, selectedChild]);
  return (
    <>
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
    </>
  );
};

export default LoginScreen;
