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
          ? ["start", "timing"]
          : ["date", "timing", "present", "absent", "excused", "late"];

        const model = isFutureSessions
          ? "craft.session"
          : "craft.attendance.line";

        const data = await browse(model, fields, filters);
        console.log("Fetched data:", data);

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
          {(isFutureSessions ? item.start : item.date)?.substring(0, 10)}
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
          {item.timing || "N/A"}
        </Text>
      </VStack>
      <VStack flex={1} alignItems="center">
        {isFutureSessions ? (
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
          >
            • • •
          </Text>
        ) : (
          <Text
            color={
              item.present
                ? "green.500"
                : item.late
                ? "orange.500"
                : item.absent
                ? "red.500"
                : item.excused
                ? "purple.100"
                : isDarkMode
                ? "gray.500"
                : "gray.700"
            }
          >
            {item.present
              ? "Present(e)"
              : item.late
              ? "Retard(e)"
              : item.absent
              ? "Absent(e)"
              : item.excused
              ? "Excusé(e)"
              : "N/A"}
          </Text>
        )}
      </VStack>
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
        <Box flex={1}>
          {" "}
          {/* Ensure FlatList takes up available space */}
          <FlatList
            data={attendanceData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        </Box>
      )}
    </Box>
  );
};

export default AttendanceTable;
