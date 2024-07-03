/* -------------------------------------------------------------------------- */
/*                                  VERSION 2                                 */
/* -------------------------------------------------------------------------- */
import { Formik } from "formik";
import { Box, Link, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import {
  authenticate,
  fetchCalendarEvents,
  fetchPartnerByEmail,
  filterEventsByPartnerMeetings,
} from "../api/apiClient";
import { CustomButton, CustomInput, LoginScreenBanner } from "../components";
import { loginValidationSchema } from "../validation/formValidation";

const LoginScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [partner, setPartner] = useState(null);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);

  const handleLogin = async (values) => {
    try {
      // Authenticate with username and password
      const sid = await authenticate(values.email, values.password);

      // Fetch partner details
      // const partnerData = await fetchPartnerByEmail(
      //   sid,
      //   values.email,
      //   values.password
      // );
      // console.log("partnerData...", partnerData);

      // Fetch calendar events
      // const calendarEvents = await fetchCalendarEvents(
      //   sessionId,
      //   values.password
      // );

      // Set state with fetched data
      // setEvents(calendarEvents);

      // if (partnerData.length > 0) {
      if (sid) {
        // setPartner(partnerData[0]);
        setSessionId(sid);
        setPassword(values.password);
        setEmail(values.email);
        setError("");
      } else {
        // setPartner(null);
        setError("Nom d'utilisateur ou mot de passe incorrect !");
      }
    } catch (error) {
      console.error("Odoo JSON-RPC Error:", error);
      // setError(
      //   "Une erreur s'est produite lors de la récupération des données du partenaire."
      // );
      setError("Nom d'utilisateur ou mot de passe incorrect !");
    }
  };

  // Effect to navigate once partner and events are fetched
  // React.useEffect(() => {
  //   if (partner && events.length > 0) {
  //     const filteredEvents = filterEventsByPartnerMeetings(partner, events);
  //     console.log("Filtered Events:", filteredEvents);
  //     // Navigation logic here
  //     navigation.navigate("TabNavigator", {
  //       sessionId: sessionId,
  //       email: email,
  //       password: password,
  //     });
  //   }
  // }, [partner, events, navigation]);
  React.useEffect(() => {
    if (sessionId && email && password) {
      navigation.navigate("TabNavigator", {
        sessionId: sessionId,
        email: email,
        password: password,
      });
    }
  }, [sessionId, email, password]);

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

/* -------------------------------------------------------------------------- */
/*                                  VERSION 1                                 */
/* -------------------------------------------------------------------------- */

// import { Formik } from "formik";
// import { Box, Link, ScrollView, Text, VStack } from "native-base";
// import React, { useState } from "react";
// import {
//   authenticate,
//   fetchCalendarEvents,
//   fetchPartnerByEmail,
//   filterEventsByPartnerMeetings,
// } from "../api/apiClient";
// import { CustomButton, CustomInput, LoginScreenBanner } from "../components";
// import { loginValidationSchema } from "../validation/formValidation";

// loginValidationSchema;

// const LoginScreen = ({ navigation }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [partner, setPartner] = useState(null);
//   const [error, setError] = useState("");
//   const [events, setEvents] = useState([]);
//   const [userId, setUserId] = useState(null);
//   // const [eventsById, setEventsById] = useState([]);
//   // const [test, setTest] = useState([]);

//   const handleLogin =
//     // (values) => {

//     async (values) => {
//       try {
//         const sessionId = await authenticate(values.email, values.password);
//         // console.log("sessionId...", sessionId);
//         const partnerData = await fetchPartnerByEmail(
//           sessionId,
//           values.email,
//           values.password
//         );

//         // const sessionDetails = await getSessionDetails(sessionId);
//         const ev = await fetchCalendarEvents(sessionId, values.password);
//         // ev && setEvents(ev);
//         setEvents(ev);

//         // events && console.log("Events...", events);

//         if (partnerData.length > 0) {
//           setPartner(partnerData[0]);
//           setError("");
//         } else {
//           setPartner(null);
//           setError("Nom d'utilisateur ou mot de passe incorrecte!");
//         }
//       } catch (error) {
//         console.error("Odoo JSON-RPC Error:", error);
//         setError("An error occurred while fetching partner data.");
//       }
//       // if (partner) {
//       // console.log("partner...", partner);
//       // navigation.navigate("TabNavigator");
//       const eventsById = filterEventsByPartnerMeetings(partner, events);
//       // partner?.meeting_ids?.forEach((id) => {
//       //   events.forEach((event) => {
//       //     if (event.id === id) {
//       //       setEventsById((prevEventsById) => [...prevEventsById, event]);
//       //     }
//       //   });
//       // });
//       // }
//       console.log("EventsById...", eventsById);
//     };

//   return (
//     <ScrollView height={"80%"} flex={1}>
//       <VStack width={"full"}>
//         <LoginScreenBanner />
//         <VStack mx={"auto"} width="80%">
//           <Box alignItems="center">
//             <Text color={"black"} fontSize="2xl" bold>
//               S'identifier
//             </Text>
//           </Box>
//           <Formik
//             initialValues={{ email: "", password: "" }}
//             validationSchema={loginValidationSchema}
//             onSubmit={handleLogin}
//           >
//             {({ handleSubmit, isValid }) => (
//               <>
//                 <CustomInput
//                   label="Email"
//                   name="email"
//                   secureTextEntry={false}
//                   showPassword={showPassword}
//                   setShowPassword={setShowPassword}
//                 />
//                 <CustomInput
//                   label="Mot de passe"
//                   name="password"
//                   secureTextEntry={true}
//                   showPassword={showPassword}
//                   setShowPassword={setShowPassword}
//                 />
//                 <Link
//                   _text={{
//                     fontSize: "xs",
//                     fontWeight: "500",
//                     color: "primary.500",
//                   }}
//                   alignSelf="flex-end"
//                   mt={1}
//                 >
//                   Mot de passe oublié ?
//                 </Link>
//                 {error ? (
//                   <Text color={"danger.500"} textAlign={"center"} mt={3}>
//                     {error}
//                   </Text>
//                 ) : null}
//                 <CustomButton
//                   onPress={handleSubmit}
//                   title="Se connecter"
//                   isDisabled={!isValid}
//                 />
//               </>
//             )}
//           </Formik>
//         </VStack>
//       </VStack>
//     </ScrollView>
//   );
// };

// export default LoginScreen;
