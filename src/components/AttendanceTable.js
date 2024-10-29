import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box, Text, HStack, VStack } from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { browse } from "../../http/http";

const AttendanceTable = ({ isDarkMode, subjectIds, isFutureSessions }) => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = [["subject_id", "in", subjectIds]]; // Fetch for multiple subject IDs
        const fields = isFutureSessions
          ? ["date", "timing"]
          : ["date", "timing", "present", "absent", "excused", "late"];

        const data = await browse("craft.attendance.line", fields, filters);
        console.log("Fetched data:", data); // Log fetched data

        const formattedData = data.map((line) => {
          const status = !isFutureSessions
            ? line.present
              ? "Présent(e)"
              : line.absent
              ? "Absent(e)"
              : line.excused
              ? "Excusé(e)"
              : line.late
              ? "En retard"
              : "Inconnu"
            : "";

          return {
            id: line.id,
            date: line.date,
            timing: line.timing || "N/A",
            status,
          };
        });

        setAttendanceData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [subjectIds, isFutureSessions]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Présent(e)":
        return "green.500";
      case "Absent(e)":
        return "red.500";
      case "Excusé(e)":
        return "yellow.500";
      case "En retard":
        return "orange.500";
      default:
        return "gray.500";
    }
  };

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
          <Text color={getStatusColor(item.status)}>{item.status}</Text>
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
