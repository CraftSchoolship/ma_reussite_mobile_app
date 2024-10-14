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

import { Box, IconButton, ScrollView, Text, VStack } from "native-base";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BackgroundWrapper } from "../components";
import { NotificationCard } from "../components/NotificationCard";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { NotificationDetail } from "../components/NotificationDetail";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const { isDarkMode } = useThemeContext();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [id, setId] = useState();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Mise à jour de l'horaire du Cours Big Data",
      description:
        "L’horaire de votre cours de Big Data a été mis à jour, la nouvelle session se déroulera le 03/06/24 à partir de 16h et non pas le 02/06/24.",
      time: "3:00 PM",
      unread: true,
    },
    {
      id: 2,
      title: "Changement d'enseignant du Cours Big Data",
      description:
        "Notez que pour votre séance de Big Data, un nouvel enseignant a été attribué.",
      time: "10:00 AM",
      unread: true,
    },
    {
      id: 3,
      title: "Facturation du Mois de Mars",
      description:
        "Vous avez effectué la totalité du paiement du mois de Mars.",
      time: "03/06/24",
      unread: false,
    },
    {
      id: 4,
      title: "Mise à jour de l'horaire du Cours Big Data",
      description: "L'horaire de votre cours de Big Data a été mis à jour.",
      time: "10/05/24",
      unread: false,
    },
  ]);

  // Fonction pour marquer une notification comme lue
  // const markAsRead = (notificationId) => {
  //   setNotifications((prevNotifications) =>
  //     prevNotifications.map((notification) =>
  //       notification.id === notificationId
  //         ? { ...notification, unread: false }
  //         : notification
  //     )
  //   );
  // };

  // const handleNotificationClick = (notificationId) => {
  //   setId(notificationId);
  //   setIsNotificationOpen(true);
  //   markAsRead(notificationId);
  // };

  return (
    <BackgroundWrapper navigation={navigation}>
      <Box
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        py={2}
        shadow={4}
        borderBottomRadius={"xl"}
      >
        {isNotificationOpen && (
          <Box
            position={"absolute"}
            top={0}
            left={0}
            zIndex={2}
            alignItems="center"
            w={"10%"}
            bg={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.Black
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
          >
            <IconButton
              mr={"auto"}
              icon={
                <MaterialIcons
                  name="chevron-left"
                  size={34}
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                />
              }
              onPress={() => setIsNotificationOpen(false)}
            />
          </Box>
        )}
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
      </Box>
      {/* <ScrollView py={4} flexGrow={1}>
        <VStack>
          {isNotificationOpen ? (
            <NotificationDetail
              notification={notifications[id - 1]}
              index={id}
            />
          ) : (
            notifications.map((notification, index) => (
              <NotificationCard
                // key={notification.id}
                setId={setId}
                notification={notification}
                index={index}
                setIsNotificationOpen={setIsNotificationOpen}
                onPress={() => handleNotificationClick(notification.id)} // Gestion du clic
              />
            ))
          )}
        </VStack>
      </ScrollView> */}
      <ScrollView py={4} flexGrow={1}>
        <VStack>
          {isNotificationOpen ? (
            <NotificationDetail
              notification={notifications[id - 1]}
              index={id}
            />
          ) : (
            notifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                setId={setId}
                notification={notification}
                index={index}
                setIsNotificationOpen={setIsNotificationOpen}
                setNotifications={setNotifications}
              />
            ))
          )}
        </VStack>
      </ScrollView>
    </BackgroundWrapper>
  );
};

export default NotificationScreen;
