import { MaterialIcons } from "@expo/vector-icons";
import { Box, HStack, Icon, Text, VStack } from "native-base";
import React from "react";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

function CalendarCard({ date, tag, time, subject, teacher, classroom }) {
  const { isDarkMode } = useThemeContext();
  let tagColor = "";
  if (tag === "cours") {
    tagColor = "tertiary.500";
  } else if (tag === "examen") {
    tagColor = "danger.500";
  }

  return (
    <Box
      borderRadius={10}
      borderWidth={0.5}
      borderColor={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.LightBorderCalendarCard
      }
      overflow={"hidden"}
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
                  : MA_REUSSITE_CUSTOM_COLORS.LightTextCalendarCard
              }
            >
              {date}, {time}, {`(Salle ${classroom})`}
            </Text>
          </HStack>
          <HStack my={1}>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              fontWeight="bold"
              fontSize={"lg"}
              textTransform={"capitalize"}
            >
              {tag} : {subject}
            </Text>
          </HStack>
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.LightTextCalendarCard
            }
          >{`Prof : ${teacher}`}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}

export default CalendarCard;
