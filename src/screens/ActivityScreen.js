import {
  Actionsheet,
  Box,
  HStack,
  ScrollView,
  Text,
  VStack,
  useDisclose,
} from "native-base";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { CalendarCard } from "../components/Cards";

const ActivityScreen = () => {
  const { isOpen, onOpen, onClose } = useDisclose();

  return (
    <Box flex={1}>
      {/* Calendrier */}
      <Box flex={1} p={4}>
        <Calendar
          current={"2024-05-02"}
          onDayPress={onOpen}
          markedDates={{
            "2024-05-02": {
              selected: true,
              marked: true,
              selectedColor: "blue",
            },
          }}
        />
      </Box>

      {/* ActionSheet pour événements */}
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content bg={"white"}>
          <Box w="100%" h={60} px={4} justifyContent="center">
            <Text
              textAlign={"center"}
              color={"black"}
              fontSize="lg"
              fontWeight="bold"
            >
              Événements
            </Text>
          </Box>
          <ScrollView w="100%">
            <VStack space={4} px={4}>
              <CalendarCard
                // key={index}
                tag={"examen"}
                date={"today"}
                time={"14:00-15:00"}
                title={"Machine Learning"}
                details={"Détails..."}
              />
            </VStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
};

const EventCard = ({ time, title, details, onPress }) => (
  <Box bg="white" p={4} rounded="lg" shadow={2} mb={2}>
    <HStack justifyContent="space-between">
      <Text color="gray.500">{time}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text color="blue.500">Voir plus</Text>
      </TouchableOpacity>
    </HStack>
    <Text fontWeight="bold" mt={2}>
      {title}
    </Text>
    <Text mt={1}>{details}</Text>
  </Box>
);

// export default PaymentHistoryScreen;

export default ActivityScreen;
