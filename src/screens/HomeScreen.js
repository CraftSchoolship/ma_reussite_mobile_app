import { useNavigation } from "@react-navigation/native";
import {
  Box,
  ScrollView,
  VStack,
  useDisclose,
  Actionsheet,
  HStack,
  Text,
} from "native-base";
import { default as React, useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { Calendar } from "react-native-calendars";
import { CalendarCard, HomeScreenBanner } from "../components";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import CalendarLocalConfig from "../utils/CalendarLocalConfig";

CalendarLocalConfig;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();

  const markedDates = {
    "2024-07-21": {
      dots: [
        {
          color: "blue",
          tag: "cours",
          time: "10:00-13:00",
          title: "Algorithme avancées",
          details: "Détails...",
        },
        {
          color: "red",
          tag: "examen",
          time: "14:00-15:00",
          title: "Machine Learning",
          details: "Détails...",
        },
        {
          color: "red",
          tag: "examen",
          time: "14:00-15:00",
          title: "Machine Learning",
          details: "Détails...",
        },
      ],
    },
    "2024-07-28": {
      dots: [
        {
          color: "green",
          color: "blue",
          tag: "cours",
          time: "10:00-13:00",
          title: "Algorithme avancées",
          details: "Détails...",
        },
        {
          color: "red",
          tag: "examen",
          time: "14:00-15:00",
          title: "Machine Learning",
          details: "Détails...",
        },
      ],
    },
    "2024-07-17": {
      dots: [
        {
          color: "red",
          tag: "examen",
          time: "14:00-15:00",
          title: "Machine Learning",
          details: "Détails...",
        },
      ],
    },
  };
  // const [markedDate, setMarkedDate] = useState(markedDates);
  const [todaysEvents, setTodaysEvents] = useState([]);
  const [today, setToday] = useState();
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);

  useEffect(() => {
    let currentDay = new Date().toDateString();
    let year = new Date().getFullYear().toString();
    let month = new Date().getMonth();
    let day = new Date().getDate().toString();
    let strDay = new Date().getDay();
    // console.log("strDay...", strDay);
    strDay = CalendarLocalConfig.dayNamesShort[strDay];
    month = CalendarLocalConfig.monthNumbers[month];
    day = day.length === 1 ? "0" + day : day;

    currentDay = year + "-" + month + "-" + day;
    setToday(strDay + " " + day);
    // console.log("====================================");
    // console.log("In the useEffect : Date", markedDates[currentDay]?.dots[0]);
    // console.log("strDay : ", strDay);
    // console.log("====================================");
    setTodaysEvents(markedDates[currentDay]?.dots);
  }, []);

  return (
    <Box flex={1} bg={"white"}>
      <HomeScreenBanner navigation={navigation} />
      <ImageBackground
        style={{ resizeMode: "contain" }}
        source={require("../../assets/images/ma_reussite_background.png")}
      >
        <Box
          mt={4}
          mb={6}
          mx={"auto"}
          width={"90%"}
          borderRadius={10}
          // borderColor={"danger"}
          shadow={"9"}
          overflow={"hidden"}
        >
          <Calendar
            markingType={"multi-dot"}
            onDayPress={(day) => {
              const currentDaySelected = new Date(day.timestamp).getDay();
              setSelectedDay(
                CalendarLocalConfig.dayNamesShort[currentDaySelected] +
                  " " +
                  day.day
              );
              // console.log("selectedDay...", selectedDay);
              if (markedDates[day.dateString] !== undefined) {
                setSelectedDayEvents(markedDates[day.dateString].dots);
                // console.log("selectedDayEvents", selectedDayEvents);
              }
              onOpen();
            }}
            monthFormat={"MMMM yyyy"}
            onMonthChange={(month) => {
              // console.log("month changed", month);
            }}
            hideArrows={false}
            disableMonthChange={false}
            firstDay={1}
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              todayTextColor: "white",
              todayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              arrowColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              monthTextColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
            }}
          />
        </Box>
        <ScrollView
          flexGrow={1}
          h={"100%"}
          contentContainerStyle={{ paddingBottom: 80 }}
          // h={"100%"}
          w={"90%"}
          mx={"auto"}
        >
          {/* <Box> */}
          <VStack w={"full"} mb={"20%"} space={4} mt={4}>
            {todaysEvents &&
              todaysEvents.map((eventMarked, index) => (
                <CalendarCard
                  key={index}
                  tag={eventMarked.tag}
                  date={today}
                  time={eventMarked.time}
                  title={eventMarked.title}
                  details={eventMarked.details}
                />
              ))}
          </VStack>
          {/* </Box> */}
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
            <ScrollView w="100%">
              <VStack space={4} px={4}>
                {selectedDayEvents &&
                  selectedDayEvents.map((eventMarked, index) => (
                    <CalendarCard
                      key={index}
                      tag={eventMarked.tag}
                      date={selectedDay}
                      time={eventMarked.time}
                      title={eventMarked.title}
                      details={eventMarked.details}
                    />
                  ))}
              </VStack>
            </ScrollView>
          </Actionsheet.Content>
        </Actionsheet>
      </ImageBackground>
    </Box>
  );
};

export default HomeScreen;
