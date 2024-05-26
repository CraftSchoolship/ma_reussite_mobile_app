import { Formik } from "formik";
import { Box, Image, Link, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import * as Yup from "yup";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import Banner from "../../components/Banner";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères")
    .required("Mot de passe est requis"),
});

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values) => {
    console.log(values);
    // Logique de connexion
    navigation.navigate("TabNavigator");
  };

  return (
    <ScrollView height={"80%"} flex={1}>
      <VStack width={"full"}>
        <Banner />
        <VStack mx={"auto"} width="80%">
          <Box alignItems="center">
            <Text color={"black"} fontSize="2xl" bold>
              S'identifier
            </Text>
          </Box>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
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
