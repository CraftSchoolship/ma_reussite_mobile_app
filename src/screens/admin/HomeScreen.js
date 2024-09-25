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
import { getObject, jsonrpcRequest } from "../../api/apiClient";
import config from "../../api/config";
import { CalendarCard } from "../../components";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import MA_REUSSITE_CUSTOM_COLORS from "../../themes/variables";
import CalendarLocalConfig from "../../utils/CalendarLocalConfig";
import { formatOdooEvents } from "../../utils/MarkedDatesFormatage";
import { useThemeContext } from "../../hooks/ThemeContext";
import { EventsActionSheet } from "../../components/EventsActionSheet";
import CalendarTheme from "../../utils/CalendarTheme";

CalendarLocalConfig;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const route = useRoute();
  const [sessionId, setSessionId] = useState(null);
  const [password, setPassword] = useState(null);
  const [userid, setUserid] = useState(null);
  const [events, setEvents] = useState(null);
  const [markedDate, setMarkedDate] = useState({});
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [today, setToday] = useState();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchConnectedUser = async () => {
      try {
        const connectedUser = await getObject("connectedUser");
        const { sessionId, email, password, userid } = connectedUser;
        setSessionId(sessionId);
        setPassword(password);
        setUserid(userid[0]);
      } catch (error) {}
    };
    if (!sessionId) fetchConnectedUser();
  }, [sessionId]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsData = await jsonrpcRequest(
          sessionId,
          password,
          config.model.craftSession,
          [[["partner_ids", "=", userid]]],
          [
            "classroom_id",
            "recurrency",
            "rrule",
            "start",
            "stop",
            "subject_id",
            "teacher_id",
            "description",
          ]
        );

        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    if (sessionId && password) {
      fetchEvents();
    }
  }, [sessionId, password, userid]);

  useEffect(() => {
    if (events) {
      const formatedOdooEvents = formatOdooEvents(events);
      setMarkedDate(formatedOdooEvents);
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
    setTodaysEvents(markedDate[currentDay]?.dots);
  }, [markedDate]);

  return (
    <BackgroundWrapper navigation={navigation}>
      <Box flex={1} bg={"transparent"}>
        <Box
          mt={4}
          mb={6}
          mx={"auto"}
          width={"90%"}
          borderRadius={10}
          shadow={isDarkMode ? "1" : "9"}
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
                setSelectedDayEvents(markedDate[day.dateString].dots);
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
        <ScrollView flexGrow={1} h={"100%"} w={"90%"} mx={"auto"} mb={"10%"}>
          <VStack w={"full"} mb={"20%"} space={4} mt={4}>
            {todaysEvents &&
              todaysEvents.map((eventMarked, index) => (
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
      </Box>
    </BackgroundWrapper>
  );
};

export default HomeScreen;
