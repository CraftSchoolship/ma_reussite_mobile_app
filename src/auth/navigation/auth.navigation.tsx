// src/navigations/AuthNavigator.tsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigatorParams } from "_/@types/navigations";
import { AuthRoute } from "./auth.routes";
import RegisterScreen from "../screens/Register.screen";
import LoginScreen from "../screens/Login.screen";

const AuthStack = createNativeStackNavigator<AuthNavigatorParams>();

const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator initialRouteName={AuthRoute.LOGIN}>
      <AuthStack.Screen
        options={{ headerShown: false }}
        name={AuthRoute.LOGIN}
        component={LoginScreen}
      />
      <AuthStack.Screen
        options={{ headerShown: false }}
        name={AuthRoute.REGISTER}
        component={RegisterScreen}
        initialParams={{ goBack: true }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
