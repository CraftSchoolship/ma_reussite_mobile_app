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
import { filterBySelf } from "../utils/filter";

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
  const [selectedChild, setSelectedChild] = useState({});
  const [children, setChildren] = useState([]);

  const handleLogin = async (values) => {
    setLoading(false);
    const username = values.email;
    const password = values.password;
    try {
      const sessionId = await authenticate(username, password);

      if (sessionId > 0) {
        // console.log("sessionId...", sessionId);

        const user = await jsonrpcRequest(
          sessionId,
          password,
          config.model.users,
          [[["email", "=", username]]],
          ["self", "craft_role"]
        );

        console.log("user...", user[0]);

        if (user.length > 0) {
          const userid = user[0].self;
          setError("");
          const role = user[0].craft_role;
          // console.log("role...", role);

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
        if (!connectedUser) throw new Error("Missing connectedUser data");
        console.log("connectedUser...", connectedUser);

        const fetchedChildrenIDs = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.parents,
          [[["contact_id", "=", connectedUser.userid[0]]]],
          // [],
          ["child_ids", "contact_id"]
          // ["id"]
        );

        console.log("fetchedChildrenIDs...", fetchedChildrenIDs[0].child_ids);

        // console.log("filteredData...", filteredData[0].child_ids);

        // const f_Children = await jsonrpcRequest(
        //   connectedUser.sessionId,
        //   connectedUser.password,
        //   config.model.craftParentChildLine,
        //   // [[["self", "=", connectedUser.userid[0]]]],
        //   [],
        //   // ["child_ids", "self"]
        //   // ["child_ids"]
        //   []
        // );

        // console.log("f_Children...", f_Children[0]);

        if (
          !fetchedChildrenIDs.length ||
          // !fetchedChildrenIDs[0].student_ids.length
          !fetchedChildrenIDs[0].child_ids.length
        )
          throw new Error("No children found");

        const studentIds = fetchedChildrenIDs[0].child_ids;
        const students = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.craftStudent,
          [],
          ["id", "contact_id"]
          // []
        );

        console.log("students...", students);

        const childrenList = students.filter((student) =>
          studentIds.includes(student.id)
        );

        if (!childrenList.length) throw new Error("No matching students found");

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

        // const taxes = await jsonrpcRequest(
        //   connectedUser.sessionId,
        //   connectedUser.password,
        //   config.model.accountTax,
        //   [],
        //   ["id", "name"]
        // );

        // storeObject("taxes", taxes);
        // console.log("TAX...", taxes);
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    if (connectedUser?.role) getCurrencies();
  }, [connectedUser]);

  useEffect(() => {
    switch (connectedUser?.role) {
      case "student":
        navigation.navigate("TabNavigator", connectedUser);
        break;
      case "parent":
        if (children.length > 0 && Object.keys(selectedChild).length > 0) {
          navigation.navigate("ParentTabNavigator", connectedUser);
        }
        break;
      case "teacher":
        navigation.navigate("TeacherTabNavigator", connectedUser);
        break;
      case "admin":
        navigation.navigate("AdminTabNavigator", connectedUser);
        break;
      default:
        break;
    }
  }, [children, selectedChild, connectedUser]);

  return (
    <>
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
    </>
  );
};

export default LoginScreen;
