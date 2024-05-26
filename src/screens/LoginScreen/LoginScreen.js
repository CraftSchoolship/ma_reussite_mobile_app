import React, { useState } from "react";
import { Box, Center, VStack, Text, Link } from "native-base";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email est requis"),
  password: Yup.string()
    .min(6, "Le mot de passe doit comporter au moins 6 caractères")
    .required("Mot de passe est requis"),
});

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (values) => {
    console.log(values);
    // Logique de connexion
  };

  return (
    <Center flex={1} px={4}>
      <VStack space={4} width="100%" maxW="300px">
        <Box alignItems="center" mb={6}>
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
    </Center>
  );
};

export default LoginScreen;
