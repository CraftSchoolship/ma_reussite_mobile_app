import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Text, Box } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import AttendanceTable from "../components/AttendanceTable";
import HomeScreenBanner from "../components/HomeScreenBanner";

const Tab = createMaterialTopTabNavigator();

const SessionsScreen = () => {
  const { isDarkMode } = useThemeContext();
  const route = useRoute();
  const groupName = route?.params?.groupName;
  const subjectId = route?.params?.subjectId || 0;

  const tabBarOptions = {
    tabBarStyle: {
      backgroundColor: isDarkMode
        ? MA_REUSSITE_CUSTOM_COLORS.Black
        : MA_REUSSITE_CUSTOM_COLORS.White,
    },
    tabBarLabelStyle: {
      color: isDarkMode
        ? MA_REUSSITE_CUSTOM_COLORS.White
        : MA_REUSSITE_CUSTOM_COLORS.Black,
    },
    tabBarIndicatorStyle: {
      backgroundColor: isDarkMode
        ? MA_REUSSITE_CUSTOM_COLORS.Secondary
        : MA_REUSSITE_CUSTOM_COLORS.Primary,
    },
    // Optional: Adjust tab width or alignment
    tabBarContentContainerStyle: {
      justifyContent: "space-around",
    },
  };

  return (
    <Box
      flex={1}
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White
      }
      safeAreaTop
    >
      <HomeScreenBanner displayGoBackButton={true} previous={"Groups"} />
      <Box pt={4} w={"100%"}>
        <Text
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
          textAlign={"center"}
          fontWeight="bold"
          fontSize="lg"
        >
          {groupName}
        </Text>
      </Box>

      <Box mt={4} flex={1}>
        <NavigationContainer independent={true}>
          <Tab.Navigator
            initialRouteName="Présences"
            screenOptions={tabBarOptions}
          >
            <Tab.Screen
              name="Présences"
              children={() => (
                <AttendanceTable
                  isDarkMode={isDarkMode}
                  subjectId={subjectId}
                  isFutureSessions={false}
                />
              )}
            />
            <Tab.Screen
              name="Sessions futures"
              children={() => (
                <AttendanceTable
                  isDarkMode={isDarkMode}
                  subjectId={subjectId}
                  isFutureSessions={true}
                />
              )}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Box>
    </Box>
  );
};

export default SessionsScreen;