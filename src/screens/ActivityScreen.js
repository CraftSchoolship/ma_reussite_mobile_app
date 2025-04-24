import { Box, IconButton, ScrollView, Text, VStack, Center } from "native-base";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import BackgroundWrapper from "../components/BackgroundWrapper";
import NotificationCard from "../components/NotificationCard";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { NotificationDetail } from "../components/NotificationDetail";
import { useAuth } from "../utils/AuthContext";

const NotificationScreen = () => {
  const navigation = useAuth();
  const { isDarkMode } = useThemeContext();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [notificationList, updateNotificationList] = useState([
    // {
    //   id: 1,
    //   title: "Mise à jour de l'horaire du Cours Big Data",
    //   description:
    //     "L’horaire de votre cours de Big Data a été mis à jour, la nouvelle session se déroulera le 03/06/24 à partir de 16h et non pas le 02/06/24.",
    //   time: "3:00 PM",
    //   unread: true,
    //   redirectTo: "Groups",
    // },
    // {
    //   id: 2,
    //   title: "Changement d'enseignant du Cours Big Data",
    //   description:
    //     "Notez que pour votre séance de Big Data, un nouvel enseignant a été attribué.",
    //   time: "10:00 AM",
    //   unread: true,
    //   redirectTo: "Groups",
    // },
    // {
    //   id: 3,
    //   title: "Facturation du Mois de Mars",
    //   description:
    //     "Vous avez effectué la totalité du paiement du mois de Mars.",
    //   time: "03/06/24",
    //   unread: false,
    //   redirectTo: "Payment",
    // },
    // {
    //   id: 4,
    //   title: "Mise à jour de l'horaire du Cours Big Data",
    //   description: "L'horaire de votre cours de Big Data a été mis à jour.",
    //   time: "10/05/24",
    //   unread: false,
    //   redirectTo: "Groups",
    // },
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
        borderBottomRadius="xl"
      >
        {notificationOpen && (
          <Box
            position="absolute"
            top={0}
            left={0}
            zIndex={2}
            alignItems="center"
            w="10%"
          >
            <IconButton
              mr="auto"
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
              onPress={() => setNotificationOpen(false)}
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
          textAlign="center"
          mb={2}
        >
          Notifications
        </Text>
      </Box>
      <ScrollView py={4} flexGrow={1}>
        <VStack>
          {notificationOpen ? (
            <NotificationDetail
              notification={notificationList[selectedNotificationId - 1]}
              index={selectedNotificationId}
            />
          ) : notificationList.length === 0 ? (
            <Center flex={1} mt={10}>
                <Text
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                  fontSize={16}
                  fontWeight={"bold"}
                >
                  Aucun résultat trouvé
                </Text>
              </Center>
          ) : (
            notificationList.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                setId={setSelectedNotificationId}
                notification={notification}
                index={index}
                setIsNotificationOpen={setNotificationOpen}
                setNotifications={updateNotificationList}
              />
            ))
            (<Text
              mt={"30%"}
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              textAlign={"center"}
              fontSize={"2xl"}
              fontWeight={"bold"}
            >
              Pas de notifications
            </Text>)
          )}
        </VStack>
      </ScrollView>
    </BackgroundWrapper>
  );
};


export default NotificationScreen;
