import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, Text, HStack, VStack } from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { browse } from "../../http/http";

const AttendanceTable = ({ isDarkMode, subjectId, isFutureSessions }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = isFutureSessions
          ? [
              ["subject_id", "=", subjectId],
              ["start", ">", new Date().toISOString()],
            ]
          : [["subject_id", "=", subjectId]];
        const fields = isFutureSessions
          ? ["date", "timing"]
          : ["date", "timing", "present", "absent", "excused", "late"];

        const model = isFutureSessions
          ? "craft.session"
          : "craft.attendance.line";

        const data = await browse(model, fields, filters);
        console.log("Fetched data:", data); // Log fetched data

        setAttendanceData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [subjectId, isFutureSessions]);

  const renderItem = ({ item, index }) => (
    <HStack
      borderBottomWidth={1}
      borderBottomColor={isDarkMode ? "gray.700" : "gray.300"}
      padding={2}
      backgroundColor={
        index % 2 === 0
          ? isDarkMode
            ? "gray.800"
            : "gray.100"
          : isDarkMode
          ? "gray.900"
          : "white"
      }
    >
      <VStack flex={1} alignItems="center">
        <Text
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
        >
          {item.date}
        </Text>
      </VStack>
      <VStack flex={1} alignItems="center">
        <Text
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
        >
          {item.timing}
        </Text>
      </VStack>
      {!isFutureSessions ? (
        <VStack flex={1} alignItems="center">
          {/* <Text color={getStatusColor(item.status)}>{item.status}</Text> */}
          {item.present ? (
            <Text color={"green.500"}>Present(e)</Text>
          ) : item.late ? (
            <Text color={"orange.500"}>Retard(e)</Text>
          ) : item.absent ? (
            <Text color={"red.500"}>Absent(e)</Text>
          ) : item.excused ? (
            <Text color={"purple.100"}> Excusé (e)</Text>
          ) : (
            "N/A"
          )}
        </VStack>
      ) : (
        <VStack flex={1} alignItems="center">
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
          >
            • • • {/* Dots for future sessions */}
          </Text>
        </VStack>
      )}
    </HStack>
  );

  return (
    <Box
      padding={4}
      key={isDarkMode ? "dark" : "light"}
      bg={isDarkMode && MA_REUSSITE_CUSTOM_COLORS.Black}
      minH={"full"}
    >
      <HStack
        borderWidth={1}
        borderColor={isDarkMode ? "gray.700" : "gray.300"}
        padding={2}
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        borderTopRadius={"lg"}
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
            {isFutureSessions ? "Sessions Futures" : "Statut"}
          </Text>
        </VStack>
      </HStack>

      {attendanceData.length === 0 ? (
        <Box alignItems="center" padding={4}>
          <Text color={isDarkMode ? "gray.500" : "gray.700"}>
            There is nothing for now.
          </Text>
        </Box>
      ) : (
        <FlatList
          data={attendanceData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </Box>
  );
};

export default AttendanceTable;
