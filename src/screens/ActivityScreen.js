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

/* -------------------------------------------------------------------------- */
/*                                  VERSION 2                                 */
/* -------------------------------------------------------------------------- */

// import { useNavigation } from "@react-navigation/native";
// import { Box, Center, Image } from "native-base";
// import React from "react";
// import { BackgroundWrapper } from "../components";

// const ActivityScreen = () => {
//   const navigation = useNavigation();

//   return (
//     <Box flex={1} bg="white">
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
