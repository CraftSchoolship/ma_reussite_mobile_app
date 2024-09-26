import React from "react";
import { FlatList } from "react-native";
import { Box, Text, HStack, VStack } from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const attendanceData = [
  {
    id: "1",
    date: "03/06/2024",
    duration: "120 minutes",
    status: "Présent(e)",
  },
  {
    id: "2",
    date: "30/05/2024",
    duration: "120 minutes",
    status: "Présent(e)",
  },
  { id: "3", date: "27/05/2024", duration: "120 minutes", status: "Absent(e)" },
  {
    id: "4",
    date: "23/05/2024",
    duration: "120 minutes",
    status: "Présent(e)",
  },
  {
    id: "5",
    date: "20/05/2024",
    duration: "120 minutes",
    status: "Présent(e)",
  },
  { id: "6", date: "16/05/2024", duration: "120 minutes", status: "Absent(e)" },
  {
    id: "7",
    date: "13/05/2024",
    duration: "120 minutes",
    status: "Présent(e)",
  },
  { id: "8", date: "09/05/2024", duration: "120 minutes", status: "Absent(e)" },
  {
    id: "9",
    date: "06/05/2024",
    duration: "120 minutes",
    status: "Présent(e)",
  },
];

const renderItem = ({ item, index }) => (
  <HStack
    borderBottomWidth={1}
    borderBottomColor="gray.300"
    padding={2}
    backgroundColor={index % 2 === 0 ? "gray.100" : "white"}
  >
    <VStack flex={1} alignItems="center">
      <Text>{item.date}</Text>
    </VStack>
    <VStack flex={1} alignItems="center">
      <Text>{item.duration}</Text>
    </VStack>
    <VStack flex={1} alignItems="center">
      <Text color={item.status === "Présent(e)" ? "green.500" : "red.500"}>
        {item.status}
      </Text>
    </VStack>
  </HStack>
);

const AttendanceTable = ({ isDarkMode }) => {
  return (
    <Box padding={4}>
      <HStack
        borderWidth={1}
        borderBottomWidth={2}
        borderColor="gray.300"
        padding={2}
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        borderTopRadius={"lg"}
        // borderRadius={"lg"}
      >
        <VStack flex={1} alignItems="center">
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            bold
          >
            Date
          </Text>
        </VStack>
        <VStack flex={1} alignItems="center">
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            bold
          >
            Durée
          </Text>
        </VStack>
        <VStack flex={1} alignItems="center">
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            bold
          >
            Attendance
          </Text>
        </VStack>
      </HStack>

      <FlatList
        data={attendanceData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        // borderWidth={1}
        // borderTopWidth={0}
        // borderBottomColor="gray.400"
      />
    </Box>
  );
};

export default AttendanceTable;
