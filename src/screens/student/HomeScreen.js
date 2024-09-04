import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Actionsheet,
  Box,
  ScrollView,
  Text,
  VStack,
  useDisclose,
} from "native-base";
import { default as React, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { CalendarCard } from "../../components";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import MA_REUSSITE_CUSTOM_COLORS from "../../themes/variables";
import CalendarLocalConfig from "../../utils/CalendarLocalConfig";
import { formatOdooEvents } from "../../utils/MarkedDatesFormatage";
import { format } from "date-fns";
import {
  getConnectedUserDetails,
  fetchEventsData,
  filterEventsByMonth,
} from "../../utils/SessionEventUtils";
import { SafeAreaView } from "react-native";

CalendarLocalConfig;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const route = useRoute();
  const [sessionId, setSessionId] = useState(null);
  const [password, setPassword] = useState(null);
  const [userid, setUserid] = useState(null);
  const [events, setEvents] = useState([]);
  const [markedDate, setMarkedDate] = useState({});
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const today = new Date();

  useEffect(() => {
    const { sessionId, password, userid } = getConnectedUserDetails(route);
    setSessionId(sessionId);
    setPassword(password);
    setUserid(userid);
  }, [route]);

  useEffect(() => {
    if (sessionId && password && userid) {
      fetchEventsData(sessionId, password, userid).then(setEvents);
    }
  }, [sessionId, password, userid]);

  useEffect(() => {
    if (events.length > 0) {
      const formattedOdooEvents = formatOdooEvents(events);
      setMarkedDate(formattedOdooEvents);
    }
  }, [events]);

  useEffect(() => {
    if (events.length > 0) {
      const filteredEvents = filterEventsByMonth(events);
      setTodaysEvents(filteredEvents);
    }
  }, [events]);

  const handleDayPress = (day) => {
    const selectedDate = new Date(day.timestamp);
    const formattedDate = format(selectedDate, "yyyy-MM-dd");
    setSelectedDay(day.dateString);

    if (markedDate[formattedDate]) {
      setSelectedDayEvents(markedDate[formattedDate].dots);
    }

    onOpen();
  };

  return (
    <Box flex={1}>
      <BackgroundWrapper navigation={navigation}>
        <Box
          mt={4}
          mb={6}
          mx={"auto"}
          width={"90%"}
          borderRadius={10}
          shadow={"9"}
          overflow={"hidden"}
        >
          <Calendar
            markingType={"multi-dot"}
            onDayPress={handleDayPress}
            monthFormat={"MMMM yyyy"}
            hideArrows={false}
            disableMonthChange={false}
            firstDay={1}
            markedDates={markedDate}
            theme={{
              selectedDayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              todayTextColor: "white",
              todayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              arrowColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              monthTextColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
            }}
          />
        </Box>
        <SafeAreaView style={{ flex: 1, width: "100%" }}>
          <ScrollView
            flexGrow={1}
            h={"100%"}
            w={"90%"}
            mx={"auto"}
            mb={"10%"}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false} // Optional: Hide the scroll indicator for cleaner UI
          >
            <VStack w={"full"} mb={"20%"} space={4} mt={4}>
              {events.length > 0 ? (
                events.map((event, index) => (
                  <CalendarCard
                    key={index}
                    tag={event.subject_id[1]}
                    date={format(new Date(event.start), "dd MMMM yyyy")}
                    time={`${format(new Date(event.start), "HH:mm")} - ${format(
                      new Date(event.stop),
                      "HH:mm"
                    )}`}
                    subject={event.subject_id[1]}
                    teacher={event.teacher_id[1]}
                    classroom={event.classroom_id[1]}
                  />
                ))
              ) : (
                <Text>No events available.</Text>
              )}
            </VStack>
          </ScrollView>
        </SafeAreaView>
        <Actionsheet
          isOpen={isOpen}
          onClose={() => {
            setSelectedDayEvents([]);
            onClose();
          }}
        >
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
            <ScrollView
              w="100%"
              flexGrow={1}
              mx={"auto"}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              <VStack space={4} px={4}>
                {selectedDayEvents.length > 0 ? (
                  selectedDayEvents.map((eventMarked, index) => (
                    <CalendarCard
                      key={index}
                      tag={eventMarked.tag}
                      date={selectedDay}
                      time={eventMarked.time}
                      subject={eventMarked.subject}
                      teacher={eventMarked.teacher}
                      classroom={eventMarked.classroom}
                    />
                  ))
                ) : (
                  <Text>No events for this day.</Text>
                )}
              </VStack>
            </ScrollView>
          </Actionsheet.Content>
        </Actionsheet>
      </BackgroundWrapper>
    </Box>
  );
};

export default HomeScreen;
