// src/components/AppBottomTab.tsx

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MainTabRouteParams } from "_/@types/navigations";
import { MainTabRoute } from "../navigation/bottomTab.routes";
import HomeScreen from "../screens/Home.screen";
import Example from "../screens/Exemple.screen";

const AppBottomTab = createBottomTabNavigator<MainTabRouteParams>();

const AppBottomTabNavigator: React.FC = () => {
  return (
    <AppBottomTab.Navigator initialRouteName={MainTabRoute.HOME}>
      <AppBottomTab.Screen name={MainTabRoute.HOME} component={HomeScreen} />
      <AppBottomTab.Screen name={MainTabRoute.EXEMPLE1} component={Example} />
    </AppBottomTab.Navigator>
  );
};

export default AppBottomTabNavigator;
