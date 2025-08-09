import {
  Box,
  ScrollView,
  VStack,
  useDisclose,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import CalendarCard from "../components/CalendarCard";
import BackgroundWrapper from "../components/BackgroundWrapper";
import CalendarLocalConfig from "../utils/CalendarLocalConfig";
import { formatOdooEvents } from "../utils/MarkedDatesFormatage";
import { browse } from "../../http/http";
import { useThemeContext } from "../hooks/ThemeContext";
import CalendarTheme from "../utils/CalendarTheme";
import { EventsActionSheet } from "../components/EventsActionSheet";
import { useAuth } from "../utils/AuthContext";
import { getUserInfo } from "../utils/AuthService";

CalendarLocalConfig;

const HomeScreen = () => {
  const navigation = useAuth();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [user, setUser] = useState({});
  const [events, setEvents] = useState(null);
  const [markedDate, setMarkedDate] = useState({});
  const [today, setToday] = useState();
  const [selectedEvent, setSelectedEvent] = useState({});
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await getUserInfo());
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await browse(
          "craft.session",
          [
            "classroom_id",
            "start",
            "stop",
            "subject_id",
            "teacher_id",
          ],
          {
            // start_gte: new Date().toISOString().substring(0, 10),
            state_in: "confirm,start",
          }
        );

        setEvents(eventsData);
        // console.log("Events Data:", eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    if (events) {
      const formatedOdooEvents = formatOdooEvents(events);
      setMarkedDate(formatedOdooEvents);
    }
  }, [events]);

  useEffect(() => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, "0");
    const dayOfWeek = CalendarLocalConfig.dayNamesShort[today.getDay()];

    setToday(`${dayOfWeek} ${day}`);
  }, [markedDate]);

  return (
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
          key={isDarkMode ? "dark" : "light"}
          markingType={"multi-dot"}
          onDayPress={(day) => {
            setSelectedDayEvents(markedDate[day.dateString]?.events || []);
            Object.values(markedDate).forEach(
              (item) => (item.selected = false)
            );
            markedDate[day.dateString] = {
              ...markedDate[day.dateString],
              selected: true,
            };
          }}
          monthFormat={"MMMM yyyy"}
          hideArrows={false}
          disableMonthChange={false}
          firstDay={1}
          markedDates={markedDate}
          theme={CalendarTheme(isDarkMode)}
        />
      </Box>

      <ScrollView
        flex={1}
        flexGrow={1}
        w={"90%"}
        mx={"auto"}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <VStack w={"full"} mb={"20%"} mt={4}>
          <Box>
            {selectedDayEvents.map((event, eventIndex) => (
              <CalendarCard
                key={eventIndex}
                tag={event.tag}
                time={event.time}
                subject={event.subject}
                teacher={event.teacher}
                classroom={event.classroom}
                onClick={() => {
                  setSelectedEvent(event);
                  onOpen();
                }}
              />
            ))}
          </Box>
        </VStack>
      </ScrollView>

      <EventsActionSheet
        isDarkMode={isDarkMode}
        user={user}
        selectedEvent={selectedEvent}
        today={today}
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        navigation={navigation}
      />
    </BackgroundWrapper>
  );
};

export default HomeScreen;
