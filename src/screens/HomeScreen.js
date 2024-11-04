import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Actionsheet,
  Box,
  ScrollView,
  Text,
  VStack,
  useDisclose,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
// import { browse } from "../../http/http";
import { getObject } from "../api/apiClient";
import { CalendarCard } from "../components";
import BackgroundWrapper from "../components/BackgroundWrapper";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import CalendarLocalConfig from "../utils/CalendarLocalConfig";
import { formatOdooEvents } from "../utils/MarkedDatesFormatage";
import { browse } from "../../http/http";
import { useThemeContext } from "../hooks/ThemeContext";
import CalendarTheme from "../utils/CalendarTheme";
import { EventsActionSheet } from "../components/EventsActionSheet";

CalendarLocalConfig;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const route = useRoute();
  const [user_id, setUserId] = useState(null);
  const [partner_id, setPartnerId] = useState(null);
  const [events, setEvents] = useState(null);
  const [markedDate, setMarkedDate] = useState({});
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [today, setToday] = useState();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [eventsByMonth, setEventsByMonth] = useState({});
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchConnectedUser = async () => {
      try {
        const connectedUser = await getObject("connectedUser");
        setUserId(connectedUser.id);
        setPartnerId(connectedUser.self[0]);
      } catch (error) {
        console.error("Error fetching connected user:", error);
      }
    };

    if (!user_id) fetchConnectedUser();
  }, [user_id]);

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
            "description",
          ]
          // [
          //   ["start", ">", new Date().toISOString()],
          //   [
          //     "stop",
          //     "<",
          //     new Date(
          //       new Date().valueOf() + 7 * 24 * 60 * 60 * 1000
          //     ).toISOString(),
          //   ],
          // ]
        );

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (user_id) {
      fetchEvents();
    }
  }, [partner_id]);

  useEffect(() => {
    if (events) {
      const formatedOdooEvents = formatOdooEvents(events);
      setMarkedDate(formatedOdooEvents);

      // Organize events by month
      const eventsByMonth = {};
      for (const [date, event] of Object.entries(formatedOdooEvents)) {
        const [year, month] = date.split("-");
        const monthKey = `${year}-${month}`;
        if (!eventsByMonth[monthKey]) {
          eventsByMonth[monthKey] = [];
        }
        eventsByMonth[monthKey].push(...event.dots);
      }
      setEventsByMonth(eventsByMonth);
    }
  }, [events]);

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    const dayOfWeek = CalendarLocalConfig.dayNamesShort[today.getDay()];

    const currentDay = `${year}-${month}-${day}`;
    setToday(`${dayOfWeek} ${day}`);
    setTodaysEvents(markedDate[currentDay]?.dots || []);
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
            const currentDaySelected = new Date(day.timestamp).getDay();
            setSelectedDay(
              `${CalendarLocalConfig.dayNamesShort[currentDaySelected]} ${day.day}`
            );
            if (markedDate[day.dateString] !== undefined) {
              setSelectedDayEvents(markedDate[day.dateString].dots || []);
            }
            onOpen();
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
          {Object.entries(eventsByMonth).map(([monthKey, events], index) => (
            <Box key={index}>
              {events.map((event, eventIndex) => (
                <CalendarCard
                  key={eventIndex}
                  tag={event.tag}
                  date={event.date}
                  time={event.time}
                  subject={event.subject}
                  teacher={event.teacher}
                  classroom={event.classroom}
                />
              ))}
            </Box>
          ))}
        </VStack>
      </ScrollView>

      <EventsActionSheet
        isDarkMode={isDarkMode}
        selectedDayEvents={selectedDayEvents}
        setSelectedDayEvents={setSelectedDayEvents}
        today={today}
        isOpen={isOpen}
        onClose={() => {
          setSelectedDayEvents([]);
          onClose();
        }}
      />
    </BackgroundWrapper>
  );
};

export default HomeScreen;
