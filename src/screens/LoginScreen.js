import { Formik } from "formik";
import { Box, Link, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import * as Yup from "yup";
import { LoginScreenBanner, CustomButton, CustomInput } from "../components";
import { loginValidationSchema } from "../validation/formValidation";
import {
  authenticate,
  fetchCalendarEvents,
  fetchPartnerByEmail,
  getCalendarEvents,
  getSessionDetails,
} from "../api/apiClient";

loginValidationSchema;

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [partner, setPartner] = useState(null);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [userId, setUserId] = useState(null);

  const handleLogin =
    // (values) => {

    async (values) => {
      try {
        const sessionId = await authenticate();
        // console.log("sessionId...", sessionId);
        const partnerData = await fetchPartnerByEmail(sessionId, values.email);

        // const sessionDetails = await getSessionDetails(sessionId);
        const events = await fetchCalendarEvents(sessionId);
        setEvents(events);

        // if (events) {
        //   console.log("Events...", events);
        // }

        if (partnerData.length > 0) {
          setPartner(partnerData[0]);
          setError("");
        } else {
          setPartner(null);
          setError("Nom d'utilisateur ou mot de passe incorrecte!");
        }
      } catch (error) {
        console.error("Odoo JSON-RPC Error:", error);
        setError("An error occurred while fetching partner data.");
      }
      if (partner) {
        // console.log("partner...", partner);
        // navigation.navigate("TabNavigator");
      }

      events.map((event) => {
        partner.meeting_ids.map((id) => {
          event.id === id && console.log("oui");
        });
      });
      // partner && console.log("Partner...", partner);
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
