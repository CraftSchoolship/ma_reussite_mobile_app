import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import { Box, Link, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import { authenticate } from "../api/apiClient";
import { CustomButton, CustomInput, LoginScreenBanner } from "../components";
import { loginValidationSchema } from "../validation/formValidation";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (values) => {
    try {
      const sid = await authenticate(values.email, values.password);
      if (sid) {
        console.log("sid...", sid);
        setError("");
        navigation.navigate("TabNavigator", {
          sessionId: sid,
          email: values.email,
          password: values.password,
        });
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect !");
      }
    } catch (error) {
      console.error("Odoo JSON-RPC Error:", error);
      setError("Nom d'utilisateur ou mot de passe incorrect !");
    }
  };

  return (
    <ScrollView height={"80%"} flex={1}>
      <VStack width={"full"}>
        <LoginScreenBanner />
        <VStack mx={"auto"} width="80%">
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
                  secureTextEntry={false}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <CustomInput
                  label="Mot de passe"
                  name="password"
                  secureTextEntry={true}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "primary.500",
                  }}
                  alignSelf="flex-end"
                  mt={1}
                >
                  Mot de passe oublié ?
                </Link>
                {error ? (
                  <Text color={"danger.500"} textAlign={"center"} mt={3}>
                    {error}
                  </Text>
                ) : null}
                <CustomButton
                  onPress={handleSubmit}
                  title="Se connecter"
                  isDisabled={!isValid}
                />
              </>
            )}
          </Formik>
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default LoginScreen;
