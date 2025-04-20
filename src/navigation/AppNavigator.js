import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./StackNavigator";
import AppProvider from "../hooks/AppProvider";
import { AuthProvider } from "../utils/AuthContext";


export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <AuthProvider>
        <StackNavigator />
        </AuthProvider>
      </AppProvider>
    </NavigationContainer>
  );
};
