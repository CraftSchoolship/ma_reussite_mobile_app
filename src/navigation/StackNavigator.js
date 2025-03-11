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
import * as Linking from 'expo-linking';


const prefix = Linking.createURL('/');

const Stack = createStackNavigator();

export const StackNavigator = () => {
   const linking = {
      prefixes: [prefix, 'https://app.craftschoolship.com'],
    };
  return (
    <Stack.Navigator initialRouteName="Splash" linking={linking}>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={SplashScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Policy"
        component={PolicyScreen}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="DrawerNavigator"
        component={DrawerNavigator}
      />
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
