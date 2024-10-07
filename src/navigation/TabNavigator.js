import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityScreen,
  GroupScreen,
  HomeScreen,
  NoteScreen,
  PaymentScreen,
} from "../screens";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { getObject } from "../api/apiClient";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const propagedRoute = useRoute();
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {
    const fetchConnectedUser = async () => {
      try {
        const storedUser = await getObject("connectedUser");
        // console.log("storedUser...", storedUser);

        setConnectedUser(storedUser);
      } catch (error) {}
    };
    if (!connectedUser) fetchConnectedUser();
  }, [connectedUser]);

  const getPaymentTab = () => {
    switch (connectedUser?.role) {
      case "student":
      case "parent":
      case "teacher":
        return (
          <Tab.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ tabBarShowLabel: false }}
          />
        );
      default:
        return null;
    }
  };

  const getNoteTab = () => {
    switch (connectedUser?.role) {
      case "student":
      case "parent":
        return (
          <Tab.Screen
            name="Notes"
            component={NoteScreen}
            options={{ tabBarShowLabel: false }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          route.params = propagedRoute?.params;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Payment") {
            iconName = "payment";
          } else if (route.name === "Groups") {
            iconName = "group";
          } else if (route.name === "Notes") {
            iconName = "timeline";
          } else if (route.name === "Activities") {
            iconName = "notifications";
          }

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
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarShowLabel: false }}
      />
      {getPaymentTab()}
      <Tab.Screen
        name="Groups"
        component={GroupScreen}
        options={{ tabBarShowLabel: false }}
      />
      {getNoteTab()}
      <Tab.Screen
        name="Activities"
        component={ActivityScreen}
        options={{ tabBarShowLabel: false }}
      />
    </Tab.Navigator>
  );
};
