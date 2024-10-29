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
  const subjectId = route?.params?.subjectId || 0;

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
          <>
            <Box
              position={"absolute"}
              top={0}
              right={visibleTab === "first" ? 0 : null}
              left={visibleTab === "second" ? 0 : null}
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
                      visibleTab === "first" ? "chevron-right" : "chevron-left"
                    }
                    size={24}
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                  />
                }
                onPress={() =>
                  setVisibleTab(visibleTab === "first" ? "second" : "first")
                }
              />
            </Box>
            <Tab.Navigator
              screenOptions={tabBarOptions(
                visibleTab === "first" ? "right" : "left"
              )}
            >
              {visibleTab === "first" ? (
                <Tab.Screen
                  name="Participants"
                  id="participants"
                  children={() => (
                    <ParticipantList
                      isDarkMode={isDarkMode}
                      students={students}
                    />
                  )}
                />
              ) : null}
              <Tab.Screen
                name="Présences"
                id="attendance"
                children={() => (
                  <AttendanceTable
                    isDarkMode={isDarkMode}
                    subjectId={subjectId}
                    isFutureSessions={false}
                  />
                )}
              />
              {visibleTab === "second" ? (
                <Tab.Screen
                  name="Sessions futures"
                  id="sessions"
                  children={() => (
                    <AttendanceTable
                      isDarkMode={isDarkMode}
                      subjectId={subjectId}
                      isFutureSessions={true}
                    />
                  )}
                />
              ) : null}
            </Tab.Navigator>
          </>
        </NavigationContainer>
      </Box>
    </Box>
  );
};

export default SessionsScreen;
