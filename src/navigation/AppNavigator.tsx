import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import SettingsStackNavigator from "./SettingsStackNavigator";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Settings") {
              iconName = "settings";
            }

            // You can return any component that you like here!
            return (
              <Ionicons name={iconName as any} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="Settings" component={SettingsStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
