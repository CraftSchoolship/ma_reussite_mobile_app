import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./StackNavigator";
import { AppProvider } from "../hooks";

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppProvider>
        <StackNavigator />
      </AppProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
