import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, Box, IconButton } from "native-base";
import { useRoute } from "@react-navigation/native";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import AttendanceTable from "../components/AttendanceTable";
import { HomeScreenBanner } from "../components";
import ParticipantList from "../components/ParticipantList";

const Tab = createMaterialTopTabNavigator();

const SessionsScreen = ({}) => {
  const [visibleTab, setVisibleTab] = useState("first");
  const { isDarkMode } = useThemeContext();
  const route = useRoute();
  const groupName = route?.params?.groupName;
  const students = route?.params?.students || [];
  const subjectIds = route?.params?.subjectIds || [];

  const tabBarOptions = (margin) => ({
    tabBarStyle: {
      backgroundColor: isDarkMode
        ? MA_REUSSITE_CUSTOM_COLORS.Black
        : MA_REUSSITE_CUSTOM_COLORS.White,
      width: "90%",
      ...(margin === "left" && { marginLeft: "auto", marginRight: 0 }),
      ...(margin === "right" && { marginRight: "auto", marginLeft: 0 }),
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
  });

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
          {visibleTab === "first" ? (
            <>
              <Box
                position={"absolute"}
                top={0}
                right={0}
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
                      name="chevron-right"
                      size={24}
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      }
                    />
                  }
                  onPress={() => setVisibleTab("second")}
                />
              </Box>
              <Tab.Navigator screenOptions={tabBarOptions("right")}>
                <Tab.Screen
                  name="Participants"
                  children={() => (
                    <ParticipantList
                      isDarkMode={isDarkMode}
                      students={students}
                    />
                  )}
                />
                <Tab.Screen
                  name="Présences"
                  children={() => (
                    <AttendanceTable
                      isDarkMode={isDarkMode}
                      subjectIds={subjectIds}
                      isFutureSessions={false}
                    />
                  )}
                />
              </Tab.Navigator>
            </>
          ) : (
            <>
              <Box
                position={"absolute"}
                top={0}
                left={0}
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
                      name="chevron-left"
                      size={24}
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      }
                    />
                  }
                  onPress={() => setVisibleTab("first")}
                />
              </Box>
              <Tab.Navigator screenOptions={tabBarOptions("left")}>
                <Tab.Screen
                  name="Présences"
                  children={() => (
                    <AttendanceTable
                      isDarkMode={isDarkMode}
                      subjectIds={subjectIds}
                      isFutureSessions={false}
                    />
                  )}
                />
                <Tab.Screen
                  name="Sessions futures"
                  children={() => (
                    <AttendanceTable
                      isDarkMode={isDarkMode}
                      subjectIds={subjectIds}
                      isFutureSessions={true}
                    />
                  )}
                />
              </Tab.Navigator>
            </>
          )}
        </NavigationContainer>
      </Box>
    </Box>
  );
};

export default SessionsScreen;
