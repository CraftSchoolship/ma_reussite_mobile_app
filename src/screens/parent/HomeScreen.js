import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Actionsheet,
  Box,
  ScrollView,
  StatusBar,
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [connectedUser, setConnectedUser] = useState(null);
  const [usersChildren, setUsersChildren] = useState({
    listOfChildren: [],
    selectedChild: {},
  });
  const [events, setEvents] = useState(null);
  const [markedDate, setMarkedDate] = useState({});
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [today, setToday] = useState();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    const getConnectedUser = async () => {
      try {
        const user = await getObject("connectedUser");
        if (!user) throw new Error("No connectedUser found");
        setConnectedUser(user);

        const childrenData = (await getObject("children")) || {};
        setUsersChildren(childrenData);
      } catch (error) {
        console.error("Error while getting connectedUser:", error);
      }
    };
    getConnectedUser();
  }, [route]);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!connectedUser) throw new Error("Missing connectedUser data");

        const fetchedChildren = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.opParents,
          [[["name", "=", connectedUser.partnerid[0]]]],
          ["student_ids"]
        );

        if (!fetchedChildren.length || !fetchedChildren[0].student_ids.length)
          throw new Error("No children found");

        const studentIds = fetchedChildren[0].student_ids;
        const students = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.opStudent,
          [],
          ["id", "partner_id"]
        );

        const childrenList = students.filter((student) =>
          studentIds.includes(student.id)
        );
        // console.log("childrenList...", childrenList);
        if (!childrenList.length) throw new Error("No matching students found");

        setChildren(childrenList);
        const initialSelectedChild =
          route.params?.selectedChild || childrenList[0];
        setSelectedChild(initialSelectedChild);

        await storeObject("children", {
          listOfChildren: childrenList,
          selectedChild: initialSelectedChild,
        });
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (connectedUser) {
      loadData();
    }
  }, [connectedUser, route.params?.selectedChild]);

  useEffect(() => {
    const fetchMarkedDates = async () => {
      try {
        if (!connectedUser || !children.length) return;

        const initialSelectedChild = usersChildren.selectedChild || children[0];
        // console.log(
        //   "(fetchMarkedDates) - initialSelectedChild...",
        //   initialSelectedChild
        // );
        const eventsData = await jsonrpcRequest(
          connectedUser.sessionId,
          connectedUser.password,
          config.model.craftSession,
          [[["partner_ids", "=", initialSelectedChild.partner_id[0]]]],
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

    if (children.length && usersChildren.selectedChild) {
      fetchMarkedDates();
    }
  }, [children, usersChildren.selectedChild]);

  useEffect(() => {
    if (events && usersChildren.selectedChild) {
      const formattedOdooEvents = formatOdooEvents(events);
      setMarkedDate(formattedOdooEvents);
    }
  }, [events, usersChildren.selectedChild]);

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
    <Box flex={1} bg={"white"}>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      {children.length > 0 && (
        <BackgroundWrapper
          selectedChild={selectedChild}
          listOfChildren={children}
          navigation={navigation}
        >
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
                    <Box
                      mx={"auto"}
                      width={"100%"}
                      bg={"white"}
                      justifyContent={"center"}
                    >
                      <Text
                        textAlign={"center"}
                        color={"black"}
                        fontSize="md"
                        fontWeight="bold"
                      >
                        Aucun événement aujourd'hui.
                      </Text>
                    </Box>
                  )}
                </VStack>
              </ScrollView>
            </Actionsheet.Content>
          </Actionsheet>
        </BackgroundWrapper>
      )}
    </Box>
  );
};

export default HomeScreen;
