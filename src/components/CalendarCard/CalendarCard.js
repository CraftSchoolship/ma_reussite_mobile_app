import React from "react";
import { Box, HStack, Icon, Text, VStack } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function CalendarCard({ date, title, details, tag }) {
  let tagColor = "";
  if (tag === "cours") {
    tagColor = "tertiary.500";
  } else if (tag === "exam") {
    tagColor = "danger.500";
  }

  return (
    <Box
      borderRadius={10}
      borderWidth={0.5}
      borderColor={"gray.400"}
      overflow={"hidden"}
    >
      <HStack
        justifyContent="space-between"
        alignItems="center"
        bg="gray.100"
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
            <Text color="gray.500">{date}</Text>
          </HStack>
          <Text color={"black"} fontWeight="bold">
            {title}
          </Text>
          <Text color="gray.500">{details}</Text>
        </VStack>
        <Icon as={MaterialIcons} name="more-vert" size={6} />
      </HStack>
    </Box>
  );
}

export default CalendarCard;
