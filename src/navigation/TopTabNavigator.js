import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import {
  ActivityScreen,
  GroupScreen,
  HomeScreen,
  NoteScreen,
  ParticipantScreen,
  PaymentScreen,
  SessionScreen,
} from "../screens";

const Tab = createBottomTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Participant") {
            // iconName = "home";
          } else if (route.name === "Sessions") {
            // iconName = "euro-symbol";
          }
          // else if (route.name === "Sessions Futures") {
          //   // iconName = "group";
          // }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "white",
        tabBarItemStyle: {
          paddingBottom: 5,
        },
        tabBarIconStyle: {
          backgroundColor: "white",
        },
        tabBarStyle: {
          backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
          // height: "7%",
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Participant"
        component={ParticipantScreen}
        options={{ tabBarLabel: "Participants" }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionScreen}
        options={{ tabBarLabel: "Sessions Passées" }}
      />
      {/* <Tab.Screen
        name="Groups"
        component={GroupScreen}
        options={{ tabBarLabel: "Groupes" }}
      /> */}
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
