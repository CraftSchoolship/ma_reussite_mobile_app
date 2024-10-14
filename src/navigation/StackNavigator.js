import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  LoginScreen,
  ProfileScreen,
  SplashScreen,
  PolicyScreen,
} from "../screens";
import DrawerNavigator from "./DrawerNavigator";
import { LoginScreenBanner } from "../components";

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      {/* Splash Screen */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />

      {/* Policy Screen */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Policy"
        component={PolicyScreen}
      />

      {/* Drawer Navigator (Main App) */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="DrawerNavigator"
        component={DrawerNavigator}
      />

      {/* Login Screen */}
      <Stack.Screen
        options={{ headerShown: true, header: () => <LoginScreenBanner /> }}
        name="Login"
        component={LoginScreen}
      />

      {/* Profile Screen */}
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </Stack.Navigator>
  );
};
