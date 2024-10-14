import { Badge, Box, HStack, Pressable, Text, VStack } from "native-base";
import React from "react";

import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useThemeContext } from "../hooks/ThemeContext";
export const NotificationDetail = ({ notification, index }) => {
  const { isDarkMode } = useThemeContext();

  return (
    <Pressable key={index} onPress={() => console.log("Notification pressée")}>
      <Box
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        py={4}
        px={2}
        mb={1}
        shadow={1}
      >
        <HStack>
          <VStack w={"full"}>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              fontWeight={"bold"}
              textAlign={"center"}
              mb={2}
            >
              {notification?.title}
            </Text>
            <Text color={isDarkMode ? "gray.100" : "gray.500"}>
              {notification?.description}
            </Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  );
};
