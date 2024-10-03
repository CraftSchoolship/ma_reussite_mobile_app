import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SessionsScreen from "../screens/SessionsScreen";
import DrawerNavigator from "./DrawerNavigator";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        options={{ headerShown: false }}
        name="DrawerNavigator"
        component={DrawerNavigator}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTintColor: MA_REUSSITE_CUSTOM_COLORS.White,
          headerStyle: { backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Black },

          cardStyle: { backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Dark },
        }}
        name="Profil"
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Session"
        component={SessionsScreen}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
