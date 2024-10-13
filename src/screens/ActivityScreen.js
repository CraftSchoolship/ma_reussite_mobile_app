// import * as FileSystem from "expo-file-system";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import {
//   Box,
//   Text,
//   Image,
//   ScrollView,
//   Pressable,
//   HStack,
//   VStack,
//   useDisclose,
//   Actionsheet,
// } from "native-base";
// import React, { useEffect, useState } from "react";
// import { BackgroundWrapper } from "../../components";
// import config from "../../api/config";
// import { jsonrpcRequest } from "../../api/apiClient";

// const ActivityScreen = () => {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const [uid, setUid] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [self, setSelfId] = useState(null);
//   const [activities, setActivities] = useState([]);
//   const { isOpen, onOpen, onClose } = useDisclose();
//   const [selectedActivity, setSelectedActivity] = useState();

//   useEffect(() => {
//     const connectedUser = route?.params;
//     const { uid, email, password, self } = connectedUser;
//     setUid(uid);
//     setPassword(password);
//     setSelfId(self[1]);
//   }, [route]);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const activitiesData = await jsonrpcRequest(
//           uid,
//           config.password,
//           config.model.opActivity,
//           [[["student_id", "=", self]]],
//           ["student_id", "type_id", "date", "description"]
//         );

//         if (activitiesData.length > 0) {
//           setActivities(activitiesData);
//         }
//       } catch (error) {
//         console.error("Error fetching profile image:", error);
//       }
//     };

//     if (uid && password && self) {
//       fetchActivities();
//     }
//   }, [uid, password, self]);

//   return (
//     <Box flex={1} bg={isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White}>
//       <BackgroundWrapper navigation={navigation}>
//         <Box>
//           <ScrollView
//             p={4}
//             h={"100%"}
//             flexGrow={1}
//             contentContainerStyle={{ paddingBottom: 80 }}
//           >
//             {activities.length > 0 ? (
//               activities.map((activity, index) => (
//                 <Box
//                   key={index}
//                   bg={isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White}
//                   p={4}
//                   my={0.5}
//                   borderRadius={"md"}
//                   // onPress={() => navigation.navigate("Sessions")}
//                 >
//                   <HStack justifyContent={"space-between"}>
//                     <Text color={MA_REUSSITE_CUSTOM_COLORS.Black} fontWeight={"bold"}>
//                       {activity.type_id[1]}
//                     </Text>
//                     <Text color={MA_REUSSITE_CUSTOM_COLORS.Black} fontWeight={"bold"}>
//                       {activity.date}
//                     </Text>
//                   </HStack>
//                   {activity.description && (
//                     <VStack>
//                       <Text color={MA_REUSSITE_CUSTOM_COLORS.Black} maxH={5}>
//                         {activity.description}
//                       </Text>
//                       <Text
//                         underline={true}
//                         fontWeight="500"
//                         color="blue.500"
//                         onPress={() => {
//                           setSelectedActivity(activity);
//                           onOpen();
//                         }}
//                       >
//                         Voir plus...
//                       </Text>
//                     </VStack>
//                   )}
//                 </Box>
//               ))
//             ) : (
//               <Box>
//                 <Text
//                   mt={"30%"}
//                   color={MA_REUSSITE_CUSTOM_COLORS.Black}
//                   textAlign={"center"}
//                   fontSize={"2xl"}
//                   fontWeight={"bold"}
//                 >
//                   Pas d'evenement
//                 </Text>
//               </Box>
//             )}
//           </ScrollView>
//         </Box>

//         <Actionsheet
//           isOpen={isOpen}
//           onClose={() => {
//             onClose();
//           }}
//         >
//           <Actionsheet.Content bg={isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White}>
//             <Box w="100%" h={60} pt={4} justifyContent="center">
//               <Text
//                 textAlign={"center"}
//                 color={MA_REUSSITE_CUSTOM_COLORS.Black}
//                 fontSize="lg"
//                 fontWeight="bold"
//               >
//                 {selectedActivity && selectedActivity.type_id[1]}
//               </Text>
//             </Box>
//             <VStack p={2} w={"100%"} m={2}>
//               <Text my={4} color={MA_REUSSITE_CUSTOM_COLORS.Black}>
//                 <Text fontWeight={"bold"}>Date : </Text>
//                 {selectedActivity && selectedActivity.date}
//               </Text>
//               <Text color={MA_REUSSITE_CUSTOM_COLORS.Black} lineHeight={24}>
//                 <Text fontWeight={"bold"}>Description : </Text>
//                 {selectedActivity && selectedActivity.description}
//               </Text>
//             </VStack>
//           </Actionsheet.Content>
//         </Actionsheet>
//       </BackgroundWrapper>
//     </Box>
//   );
// };

// export default ActivityScreen;

/* -------------------------------------------------------------------------- */
/*                                  VERSION_1                                 */
/* -------------------------------------------------------------------------- */

// import { useNavigation } from "@react-navigation/native";
// import { Box, Center, Image } from "native-base";
// import React from "react";
// import { BackgroundWrapper } from "../components";

// const ActivityScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <Box flex={1} bg=MA_REUSSITE_CUSTOM_COLORS.White>
//       <BackgroundWrapper navigation={navigation}>
//         <Center minH={"80%"}>
//           <Image
//             size="sm"
//             w={"90%"}
//             resizeMode="contain"
//             minH={"70%"}
//             p={2}
//             source={require("../../assets/images/coming_soon.png")}
//             alt="Alternate Text"
//           />
//         </Center>
//       </BackgroundWrapper>
//     </Box>
//   );
// };

// export default ActivityScreen;

import React from "react";
import {
  Box,
  Text,
  ScrollView,
  HStack,
  VStack,
  Badge,
  Pressable,
} from "native-base";

import { BackgroundWrapper } from "../components";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useThemeContext();

  // Données mockées pour les notifications
  const notifications = [
    {
      title: "Mise à jour de l'horaire du Cours Big Data",
      description: "L'horaire de votre cours de Big Data a été mis à jour.",
      time: "3:00 PM",
      unread: true,
    },
    {
      title: "Changement d'enseignant du Cours Big Data",
      description:
        "Notez que pour votre séance de Big Data, un nouvel enseignant a été attribué.",
      time: "10:00 AM",
      unread: true,
    },
    {
      title: "Facturation du Mois de Mars",
      description:
        "Vous avez effectué la totalité du paiement du mois de Mars.",
      time: "03/06/24",
      unread: false,
    },
    {
      title: "Mise à jour de l'horaire du Cours Big Data",
      description: "L'horaire de votre cours de Big Data a été mis à jour.",
      time: "10/05/24",
      unread: false,
    },
    // Ajoute d'autres notifications ici si nécessaire
  ];

  return (
    <Box
      flex={1}
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White
      }
    >
      <BackgroundWrapper navigation={navigation}>
        <Box
          flex={1}
          bg={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.Black
              : MA_REUSSITE_CUSTOM_COLORS.White
          }
        >
          <ScrollView p={4} flexGrow={1}>
            <VStack space={3}>
              {/* Titre de la page */}
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                fontSize="xl"
                fontWeight="bold"
                textAlign={"center"}
                mb={2}
              >
                Notifications
              </Text>
              {/* Liste des notifications */}
              {notifications.map((notification, index) => (
                <Pressable
                  key={index}
                  onPress={() => console.log("Notification pressée")}
                >
                  <Box
                    bg={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.BackgroundDark
                        : MA_REUSSITE_CUSTOM_COLORS.White
                    }
                    p={4}
                    borderRadius={"md"}
                    shadow={1}
                  >
                    <HStack>
                      <VStack w={"4/5"} pr={3}>
                        <Text
                          color={
                            isDarkMode
                              ? MA_REUSSITE_CUSTOM_COLORS.White
                              : MA_REUSSITE_CUSTOM_COLORS.Black
                          }
                          fontWeight={"bold"}
                          noOfLines={1}
                        >
                          {notification.title}
                        </Text>
                        <Text color={"gray.500"} noOfLines={1}>
                          {notification.description}
                        </Text>
                      </VStack>
                      <VStack w={"1/5"}>
                        <Text
                          color={
                            isDarkMode
                              ? MA_REUSSITE_CUSTOM_COLORS.White
                              : MA_REUSSITE_CUSTOM_COLORS.Black
                          }
                          fontWeight={"bold"}
                        >
                          {notification.time}
                        </Text>
                        {notification.unread && (
                          <Badge
                            colorScheme="danger"
                            rounded="full"
                            alignSelf="center"
                            variant="solid"
                            size={"xs"}
                          />
                        )}
                      </VStack>
                    </HStack>
                  </Box>
                </Pressable>
              ))}
            </VStack>
          </ScrollView>
        </Box>
      </BackgroundWrapper>
    </Box>
  );
};

export default NotificationScreen;
