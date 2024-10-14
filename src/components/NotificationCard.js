import { Box, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

export const NotificationCard = ({
  notification,
  index,
  setId,
  setIsNotificationOpen,
  setNotifications,
}) => {
  const { isDarkMode } = useThemeContext();

  const markAsRead = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const handleNotificationClick = (notificationId) => {
    setId(notificationId);
    setIsNotificationOpen(true);
    markAsRead(notificationId);
  };

  return (
    <Pressable
      key={index}
      onPress={() => {
        setId(notification?.id);
        handleNotificationClick(notification.id);
        setIsNotificationOpen(true);
      }}
    >
      <Box
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        py={4}
        px={2}
        // borderRadius={"md"}
        //    bg={"amber.500"}
        mb={1}
        shadow={1}
      >
        <HStack>
          <VStack w={"5/6"}>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              fontWeight={"bold"}
              noOfLines={1}
            >
              {notification?.title}
            </Text>
            <Text color={"gray.500"} noOfLines={1}>
              {notification?.description}
            </Text>
          </VStack>
          <VStack
            w={"1/6"}
            //    bg={"amber.500"}
          >
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              fontWeight={"bold"}
              textAlign={"right"}
            >
              {notification?.time}
            </Text>
            {notification?.unread && (
              <Box
                bg={MA_REUSSITE_CUSTOM_COLORS.Danger}
                alignSelf="center"
                variant="solid"
                size={3}
                borderRadius={"2xl"}
                mt={1}
                // ml={3}
              />
            )}
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
