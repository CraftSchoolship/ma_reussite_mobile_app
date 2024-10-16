import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Text,
} from "native-base";
import React from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const participants = [
  { id: "1", name: "Samir Tata (Enseignant)" },
  { id: "2", name: "Mohamed Mohamed" },
  { id: "3", name: "Khalil Galalem" },
  { id: "4", name: "Berthonge Christ" },
  { id: "5", name: "Nagil Glad" },
  { id: "6", name: "Rayen Dhmaied" },
  { id: "7", name: "Asad Babur" },
  { id: "8", name: "Wael Mbarek" },
  { id: "9", name: "Khadija Amri" },
  { id: "19", name: "Khadija Amri" },
  { id: "29", name: "Khadija Amri" },
  { id: "39", name: "Khadija Amri" },
];

const ParticipantList = ({ isDarkMode }) => {
  const renderParticipant = ({ item }) => (
    <Pressable>
      <Box
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        borderTopColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
            : MA_REUSSITE_CUSTOM_COLORS.LightDivider
        }
        borderBottomColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
            : MA_REUSSITE_CUSTOM_COLORS.LightDivider
        }
        p={4}
        shadow={1}
        borderBottomWidth={1}
        borderTopWidth={1}
      >
        <HStack alignItems={"center"}>
          <Avatar
            size="sm"
            mr={2}
            bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
          >
            <Icon
              as={MaterialIcons}
              name="person"
              size="lg"
              color="white"
              mx={"auto"}
            />
          </Avatar>
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
          >
            {item?.name}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );

  return (
    <Box
      minH={"full"}
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White
      }
      pt={6}
      flex={0.9}
    >
      <FlatList
        data={participants}
        keyExtractor={(item) => item.id}
        renderItem={renderParticipant}
      />
    </Box>
  );
};

export default ParticipantList;
