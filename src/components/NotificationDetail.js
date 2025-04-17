import { Ionicons } from "@expo/vector-icons";
import { Box, Button, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useNavigation } from "@react-navigation/native";

export const NotificationDetail = ({ notification, index }) => {
  const { isDarkMode } = useThemeContext();
  const navigation = useNavigation();

  return (
    <Box alignItems={"center"}>
      <Box
        key={index}
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

      <Box w={"4/6"} mt={"5/6"}>
        <Button
          bg={MA_REUSSITE_CUSTOM_COLORS.Secondary}
          _pressed={{ bg: MA_REUSSITE_CUSTOM_COLORS.Secondary, opacity: 0.5 }}
          onPress={() => {
            navigation.navigate(notification?.redirectTo);
          }}
        >
          <Text
            fontWeight={"bold"}
            fontSize={"lg"}
            color={MA_REUSSITE_CUSTOM_COLORS.White}
          >
            Afficher
          </Text>
        </Button>
        <Icon
          position={"absolute"}
          right={6}
          top={3}
          as={Ionicons}
          name="eye"
          size="lg"
          color={MA_REUSSITE_CUSTOM_COLORS.White}
        />
      </Box>
    </Box>
  );
};
