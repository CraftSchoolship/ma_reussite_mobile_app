import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import TopTabNavigator from "./TopTabNavigator";
import {
  ProfileScreen,
  LoginScreen,
  ParticipantScreen,
  SessionScreen,
} from "../screens";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="TabNavigator"
        component={TabNavigator}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        // options={{ headerShown: false }}
        name="Profile"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Participants"
        component={ParticipantScreen}
      />
      <Stack.Screen
        options={{ headerShown: true, headerTitle: "Details" }}
        name="Sessions"
        component={SessionScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
