import {
  Actionsheet,
  Box,
  ScrollView,
  Text,
  useDisclose,
  VStack,
} from "native-base";
import React from "react";
import { CalendarCard } from "../components";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

export const EventsActionSheet = ({
  isDarkMode,
  selectedDayEvents,
  setSelectedDayEvents,
  today,
  isOpen,
  onClose,
}) => {
  //   const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.DarkActionSheet
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
      >
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text
            textAlign={"center"}
            color={isDarkMode ? "white" : "black"}
            fontSize="lg"
            fontWeight="bold"
          >
            Événements
          </Text>
        </Box>
        <ScrollView
          w="100%"
          flexGrow={1}
          mx={"auto"}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <VStack space={4} px={4}>
            {selectedDayEvents &&
              selectedDayEvents.map((eventMarked, index) => (
                <CalendarCard
                  key={index}
                  tag={eventMarked.tag}
                  date={today}
                  time={eventMarked.time}
                  subject={eventMarked.subject}
                  teacher={eventMarked.teacher}
                  classroom={eventMarked.classroom}
                />
              ))}
          </VStack>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
