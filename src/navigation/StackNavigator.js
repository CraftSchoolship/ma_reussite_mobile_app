import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SessionsScreen from "../screens/SessionsScreen";
import DrawerNavigator from "./DrawerNavigator";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useThemeContext } from "../hooks/ThemeContext";
import ChevronTabs from "../screens/ChevronTabs";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { isDarkMode } = useThemeContext();
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
          headerTintColor: isDarkMode && MA_REUSSITE_CUSTOM_COLORS.White,
          headerStyle: {
            backgroundColor: isDarkMode && MA_REUSSITE_CUSTOM_COLORS.Black,
          },
          cardStyle: {
            backgroundColor: isDarkMode && MA_REUSSITE_CUSTOM_COLORS.Black,
          },
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
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Chevron"
        component={ChevronTabs}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
