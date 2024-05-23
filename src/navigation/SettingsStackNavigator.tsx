import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createStackNavigator();

const SettingsStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;
