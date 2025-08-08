import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Box, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

function CalendarCard({ tag, time, subject, teacher, classroom, onClick }) {
  const { isDarkMode } = useThemeContext();
  let tagColor = "";
  if (tag === "cours") {
    tagColor = "tertiary.500";
  } else if (tag === "examen") {
    tagColor = "danger.500";
  }

  return (
    <TouchableOpacity onPress={onClick}>
    <Box
      borderRadius={10}
      borderWidth={0.5}
      borderColor={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.LightBorderCalendarCard
      }
      overflow={"hidden"}
      mb={4}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.LightBgCalendarCard
        }
        p={4}
      >
        <VStack>
          <HStack>
            <Icon
              as={MaterialIcons}
              name="trip-origin"
              color={tagColor}
              size={4}
              alignSelf={"center"}
              mr={0.5}
            />
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              fontSize={"lg"}
            >
              {time} à {classroom}
            </Text>
          </HStack>
          <HStack my={1}>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              fontSize={"xl"}
              textTransform={"capitalize"}
              fontWeight={"bold"}
            >
              {`Cours : ${subject}`}
            </Text>
          </HStack>
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            fontSize={"lg"}
            textTransform={"capitalize"}
          >{`Prof : ${teacher}`}</Text>
        </VStack>
      </HStack>
    </Box>
    </TouchableOpacity>
  );
}

export default CalendarCard;
