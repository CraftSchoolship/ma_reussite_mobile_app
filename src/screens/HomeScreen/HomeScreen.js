import React from "react";
import {
  Box,
  Text,
  Center,
  Avatar,
  Heading,
  VStack,
  HStack,
  ScrollView,
  Icon,
  FlatList,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import HomeScreenBanner from "../../components/Banner/HomeScreenBanner";
import MA_REUSSITE_CUSTOM_COLORS from "../../themes/variables";
import CalendarCard from "../../components/CalendarCard";

const HomeScreen = () => {
  return (
    <Box flex={1} bg="white">
      <Box px={4} pt={10}>
        <HomeScreenBanner />
        <Box
          mt={4}
          mb={6}
          mx={"auto"}
          width={"100%"}
          borderRadius={10}
          borderColor={"danger"}
          shadow={"9"}
          overflow={"hidden"}
        >
          <Calendar
            onDayPress={(day) => {
              console.log("selected day", day);
            }}
            monthFormat={"MMMM yyyy"}
            onMonthChange={(month) => {
              console.log("month changed", month);
            }}
            hideArrows={false}
            disableMonthChange={false}
            firstDay={1}
            markedDates={{
              "2024-05-28": {
                selected: true,
                marked: true,
                // selectedColor: "blue",
              },
              "2024-05-17": { marked: true },
              "2024-05-18": {
                marked: true,
                dotColor: "red",
                activeOpacity: 0,
              },
              "2024-05-19": { disabled: true, disableTouchEvent: true },
            }}
            theme={{
              selectedDayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              todayTextColor: "white",
              todayBackgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              arrowColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
              monthTextColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
            }}

            // Vous pouvez ajouter des options ici
          />
        </Box>
        {/* <FlatList> */}
        <ScrollView h={80}>
          <Box mb={"20%"}>
            <VStack w={"full"} space={4} mt={4}>
              <CalendarCard
                tag={"cours"}
                date={"Thu 2, 10:00-13:00"}
                title={"Cours d'Algorithme avancées"}
                details={"Détails du cours..."}
              />
              <CalendarCard
                tag={"exam"}
                date={"Thu 2, 14:00-15:00"}
                title={"Examen Machine Learning"}
                details={"Détails de l'examen..."}
              />
              <CalendarCard
                tag={"exam"}
                date={"Thu 2, 14:00-15:00"}
                title={"Examen Machine Learning"}
                details={"Détails de l'examen..."}
              />
              {/* Ajoutez plus d'activités ici */}
            </VStack>
          </Box>
        </ScrollView>
        {/* </FlatList> */}
      </Box>
    </Box>
  );
};

export default HomeScreen;

// import React from "react";
// import { Box, Text, Button } from "native-base";

// const HomeScreen = ({ navigation }) => {
//   return (
//     <Box flex={1} justifyContent="center" alignItems="center">
//       <Text>Welcome to Home Screen</Text>
//       <Button onPress={() => navigation.navigate("Login")}>
//         Go to LoginForm
//       </Button>
//     </Box>
//   );
// };

// export default HomeScreen;
