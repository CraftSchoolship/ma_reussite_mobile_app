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

const ParticipantList = ({ isDarkMode, students }) => {
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
            {item}
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
      p={2}
    >
      {students.length > 0 ? (
        <FlatList
          data={students}
          renderItem={renderParticipant}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text
          textAlign={"center"}
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
        >
          Aucun étudiant
        </Text>
      )}
    </Box>
  );
};

export default ParticipantList;
