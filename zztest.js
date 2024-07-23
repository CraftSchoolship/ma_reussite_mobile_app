// import { useNavigation, useRoute } from "@react-navigation/native";
// import {
//   Actionsheet,
//   Box,
//   ScrollView,
//   Text,
//   VStack,
//   Button,
//   useDisclose,
// } from "native-base";
// import { default as React, useEffect, useState } from "react";
// import { Calendar } from "react-native-calendars";
// import { jsonrpcRequest } from "../../api/apiClient";
// import config from "../../api/config";
// import { CalendarCard, ParentBackgroundWrapper } from "../../components";
// import MA_REUSSITE_CUSTOM_COLORS from "../../themes/variables";
// import CalendarLocalConfig from "../../utils/CalendarLocalConfig";
// import { formatOdooEvents } from "../../utils/MarkedDatesFormatage";

// CalendarLocalConfig;

// const HomeScreen = () => {
//   const navigation = useNavigation();
//   const { isOpen, onOpen, onClose } = useDisclose();
//   const route = useRoute();
//   const [sessionId, setSessionId] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [partnerid, setPartnerid] = useState(null);
//   const [events, setEvents] = useState(null);
//   const [markedDate, setMarkedDate] = useState({});
//   const [todaysEvents, setTodaysEvents] = useState([]);
//   const [today, setToday] = useState();
//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedDayEvents, setSelectedDayEvents] = useState([]);
//   const [children, setChildren] = useState([]);
//   const [selectedChild, setSelectedChild] = useState(null);

//   useEffect(() => {
//     const { sessionId, password, partnerid, children } = route.params;
//     setSessionId(sessionId);
//     setPassword(password);
//     setPartnerid(partnerid);
//     setChildren(children);
//     if (children?.length > 0) {
//       setSelectedChild(children[0]); // Par défaut, sélectionner le premier enfant
//     }
//   }, [route]);

//   useEffect(() => {
//     if (selectedChild) {
//       const fetchEvents = async () => {
//         try {
//           const eventsData = await jsonrpcRequest(
//             sessionId,
//             password,
//             config.model.craftSession,
//             [[["partner_ids", "=", selectedChild[0]]]],
//             [
//               "classroom_id",
//               "recurrency",
//               "rrule",
//               "start",
//               "stop",
//               "subject_id",
//               "teacher_id",
//               "description",
//             ]
//           );
//           setEvents(eventsData);
//         } catch (error) {
//           console.error("Error fetching events:", error);
//         }
//       };
//       if (sessionId && password && selectedChild) {
//         fetchEvents();
//       }
//     }
//   }, [sessionId, password, selectedChild]);

//   useEffect(() => {
//     if (events) {
//       const formatedOdooEvents = formatOdooEvents(events);
//       setMarkedDate(formatedOdooEvents);
//     }
//   }, [events]);

//   useEffect(() => {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = (today.getMonth() + 1).toString().padStart(2, "0");
//     const day = today.getDate().toString().padStart(2, "0");
//     const dayOfWeek = CalendarLocalConfig.dayNamesShort[today.getDay()];

//     const currentDay = `${year}-${month}-${day}`;
//     setToday(`${dayOfWeek} ${day}`);
//     setTodaysEvents(markedDate[currentDay]?.dots);
//   }, [markedDate]);

//   const handleChildChange = (child) => {
//     setSelectedChild(child);
//     onClose();
//   };

//   return (
//     <Box flex={1} bg={"white"}>
//       <ParentBackgroundWrapper navigation={navigation}>
//         <Box
//           mt={4}
//           mb={6}
//           mx={"auto"}
//           width={"90%"}
//           borderRadius={10}
//           shadow={"9"}
//           overflow={"hidden"}
//         >
//           <Calendar
//             markingType={"multi-dot"}
//             onDayPress={(day) => {
//               const currentDaySelected = day.dateString;
//               const currentDaySelectedEvents =
//                 markedDate[currentDaySelected]?.dots;

//               setSelectedDay(day.dateString);
//               setSelectedDayEvents(currentDaySelectedEvents);
//             }}
//             markedDates={markedDate}
//             enableSwipeMonths
//           />
//         </Box>
//         <Box
//           width={"100%"}
//           mt={1}
//           p={3}
//           shadow={"9"}
//           overflow={"hidden"}
//           bg={MA_REUSSITE_CUSTOM_COLORS.Secondary}
//           borderTopRadius={20}
//         >
//           <Box
//             mb={3}
//             mx={"auto"}
//             width={"50%"}
//             borderBottomColor={"white"}
//             borderBottomWidth={1}
//           />
//           <Box>
//             <Box>
//               <Text color={"white"} fontSize={"2xl"} fontWeight={"bold"}>
//                 {selectedChild ? `Événements pour ${selectedChild[1]}` : ""}
//               </Text>
//               <Button
//                 onPress={onOpen}
//                 mt={3}
//                 bg={"transparent"}
//                 _text={{ color: "white" }}
//                 _hover={{ bg: "transparent" }}
//                 _pressed={{ bg: "transparent" }}
//               >
//                 Sélectionner un autre enfant
//               </Button>
//               <Actionsheet isOpen={isOpen} onClose={onClose}>
//                 <Actionsheet.Content>
//                   {children &&
//                     children.map((child) => (
//                       <Actionsheet.Item
//                         key={child[0]}
//                         onPress={() => handleChildChange(child)}
//                       >
//                         {child[1]}
//                       </Actionsheet.Item>
//                     ))}
//                 </Actionsheet.Content>
//               </Actionsheet>
//             </Box>
//           </Box>
//           <ScrollView>
//             <VStack space={4}>
//               {selectedDayEvents ? (
//                 <>
//                   <Box
//                     mx={"auto"}
//                     mt={4}
//                     borderBottomColor={"white"}
//                     borderBottomWidth={1}
//                   />
//                   <CalendarCard
//                     events={selectedDayEvents}
//                     label={"Séances"}
//                     day={selectedDay}
//                   />
//                 </>
//               ) : (
//                 <>
//                   <Box
//                     mx={"auto"}
//                     mt={4}
//                     borderBottomColor={"white"}
//                     borderBottomWidth={1}
//                   />
//                   <CalendarCard
//                     events={todaysEvents}
//                     label={"Séances"}
//                     day={today}
//                   />
//                 </>
//               )}
//             </VStack>
//           </ScrollView>
//         </Box>
//       </ParentBackgroundWrapper>
//     </Box>
//   );
// };

// export default HomeScreen;
