// src/navigations/AppNavigator.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppNavigatorParams } from "_/@types/navigations";
import AuthNavigator from "_/auth/navigation/auth.navigation";
import { AppRoute } from "./enum.route";
import { useAuth } from "_/hooks/useAuth"; // Custom hook to check if user is authenticated
import MainNavigator from "./app.main.bottomTab.navigator";

const AppMainStack = createNativeStackNavigator<AppNavigatorParams>();

const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Hook to determine if the user is logged in

  return (
    <NavigationContainer>
      <AppMainStack.Navigator
        initialRouteName={isAuthenticated ? AppRoute.Root : AppRoute.Auth}
      >
        {isAuthenticated ? (
          <AppMainStack.Screen
            options={{ headerShown: false }}
            name={AppRoute.Root}
            component={MainNavigator}
          />
        ) : (
          <AppMainStack.Screen
            options={{ headerShown: false }}
            name={AppRoute.Auth}
            component={AuthNavigator}
          />
        )}
      </AppMainStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
