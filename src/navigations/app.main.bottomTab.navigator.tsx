// src/navigations/MainNavigator.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MainNavigatorParams, MainRoute } from "./enum.route";
import AppBottomTabNavigator from "_/components/AppBottomTab/navigation/AppBottomTab.navigator";

const MainBottomTabStack = createNativeStackNavigator<MainNavigatorParams>();

const MainNavigator: React.FC = () => {
  return (
    <MainBottomTabStack.Navigator
      initialRouteName={MainRoute.BOTTOM_TAB_NAVIGATOR}
    >
      <MainBottomTabStack.Screen
        options={{ headerShown: false }}
        name={MainRoute.BOTTOM_TAB_NAVIGATOR}
        component={AppBottomTabNavigator}
      />
    </MainBottomTabStack.Navigator>
  );
};

export default MainNavigator;
