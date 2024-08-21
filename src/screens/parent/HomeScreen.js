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
import { getObject, jsonrpcRequest, storeObject } from "../../api/apiClient";
import config from "../../api/config";
import { CalendarCard } from "../../components";
import BackgroundWrapper from "../../components/BackgroundWrapper";
import MA_REUSSITE_CUSTOM_COLORS from "../../themes/variables";
import CalendarLocalConfig from "../../utils/CalendarLocalConfig";
import { formatOdooEvents } from "../../utils/MarkedDatesFormatage";
import { useAppContext } from "../../hooks/AppProvider";

CalendarLocalConfig;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
  const route = useRoute();

  const [events, setEvents] = useState(null);
  const [markedDate, setMarkedDate] = useState({});
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [today, setToday] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [connectedUser, setConnectedUser] = useState({
    sessionId: "",
    email: "",
    password: "",
    partnerid: "",
    role: "",
  });
  const [childrenList, setChildrenList] = useState([]);
  const { selectedChild, setSelectedChild } = useAppContext();

  useEffect(() => {
    const getConnectedUser = async () => {
      try {
        const connectedUser = await getObject("connectedUser");
        if (connectedUser) {
          setConnectedUser(connectedUser);
          const childrenList = await getObject("children");
          setChildrenList(childrenList);
          const selectedChild = await getObject("selectedChild");
          setSelectedChild(selectedChild);
        }
      } catch (error) {
        console.error("Error while getting connectedUser:", error);
      }
    };
    getConnectedUser();
  }, [route, setSelectedChild]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (
          !connectedUser ||
          !connectedUser.sessionId ||
          !connectedUser.password ||
          !connectedUser.userid
        ) {
          return;
        }
        let domain = [];
        switch (connectedUser?.role) {
          case "parent":
            if (!selectedChild?.contact_id) return;
            domain = [["partner_ids", "=", selectedChild?.contact_id[0]]];
            break;
          case "student":
            domain = [["partner_ids", "=", connectedUser?.partnerid[0]]];
            break;
          default:
            console.error("Unsupported role:", connectedUser?.role);
            return;
        }
        const eventsData = await jsonrpcRequest(
          connectedUser?.sessionId,
          connectedUser?.password,
          config.model.craftSession,
          [domain],
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
    if (connectedUser && selectedChild) fetchEvents();
  }, [connectedUser, selectedChild]);

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
            theme={{
              selectedDayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              todayTextColor: "white",
              todayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              arrowColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              monthTextColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
            }}
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
      </BackgroundWrapper>
    </Box>
  );
};

export default HomeScreen;
