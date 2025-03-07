import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { Text, Box, IconButton, Spinner } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import AttendanceTable from "../components/AttendanceTable";
import HomeScreenBanner from "../components/HomeScreenBanner";
import ParticipantList from "../components/ParticipantList";

const Tab = createMaterialTopTabNavigator();

const SessionsScreen = () => {
  const [visibleTab, setVisibleTab] = useState("initial");
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useThemeContext();
  const route = useRoute();
  const groupName = route?.params?.groupName;
  const students = route?.params?.students || [];
  const subjectId = route?.params?.subjectId || 0;

  const tabBarOptions = {
    tabBarStyle: {
      backgroundColor: isDarkMode
        ? MA_REUSSITE_CUSTOM_COLORS.Black
        : MA_REUSSITE_CUSTOM_COLORS.White,
      width: "100%",
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
  };

  const handleChevronPress = () => {
    setIsLoading(true); // Start loading state
    setTimeout(() => {
      setVisibleTab((prevTab) =>
        prevTab === "initial" ? "futureSession" : "initial"
      );
      setIsLoading(false); // End loading state
    }, 200); // Adjust timeout for better UX
  };

  useEffect(() => {
    // Reset loading state when visibleTab changes
    setIsLoading(false);
  }, [visibleTab]);

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
          <Box
            position={"absolute"}
            top={0}
            right={visibleTab === "initial" ? 0 : null}
            left={visibleTab === "futureSession" ? 0 : null}
            zIndex={2}
            alignItems="center"
            w={"10%"}
            h={12}
            bg={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.Black
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
          >
            <IconButton
              icon={
                <MaterialIcons
                  name={
                    visibleTab === "initial" ? "chevron-right" : "chevron-left"
                  }
                  size={24}
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                />
              }
              onPress={handleChevronPress}
            />
          </Box>

          <Tab.Navigator
            initialRouteName="Présences"
            screenOptions={tabBarOptions}
          >
            {visibleTab === "initial" ? (
              <>
                <Tab.Screen
                  key="Participants"
                  name="Participants"
                  children={() => (
                    <ParticipantList
                      isDarkMode={isDarkMode}
                      students={students}
                    />
                  )}
                />
                <Tab.Screen
                  key="Présences-Initial"
                  name="Présences"
                  children={() =>
                    isLoading ? (
                      <Box flex={1} justifyContent="center" alignItems="center">
                        <Spinner color={isDarkMode ? "white" : "black"} />
                      </Box>
                    ) : (
                      <AttendanceTable
                        isDarkMode={isDarkMode}
                        subjectId={subjectId}
                        isFutureSessions={false}
                      />
                    )
                  }
                />
              </>
            ) : (
              <>
                <Tab.Screen
                  key="Présences-Future"
                  name="Présences"
                  children={() =>
                    isLoading ? (
                      <Box flex={1} justifyContent="center" alignItems="center">
                        <Spinner color={isDarkMode ? "white" : "black"} />
                      </Box>
                    ) : (
                      <AttendanceTable
                        isDarkMode={isDarkMode}
                        subjectId={subjectId}
                        isFutureSessions={false}
                      />
                    )
                  }
                />
                <Tab.Screen
                  key="Sessions-futures"
                  name="Sessions futures"
                  children={() =>
                    isLoading ? (
                      <Box flex={1} justifyContent="center" alignItems="center">
                        <Spinner color={isDarkMode ? "white" : "black"} />
                      </Box>
                    ) : (
                      <AttendanceTable
                        isDarkMode={isDarkMode}
                        subjectId={subjectId}
                        isFutureSessions={true}
                      />
                    )
                  }
                />
              </>
            )}
          </Tab.Navigator>
        </NavigationContainer>
      </Box>
    </Box>
  );
};

export default SessionsScreen;
