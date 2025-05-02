import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useFonts from "./src/hooks/useFonts";
import ThemeProvider from "./src/hooks/ThemeContext";
import AuthProvider from "./src/utils/AuthContext";
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import SplashScreen from "./src/screens/SplashScreen";
import PolicyScreen from "./src/screens/PolicyScreen";
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import LoginScreenBanner from "./src/components/LoginScreenBanner";
import * as Linking from 'expo-linking';
import { NotificationProvider } from "./src/hooks/NotificationContext";
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert:   true,
    shouldPlaySound:   true,
    shouldSetBadge:    true,
  }),
});

const prefix = Linking.createURL('/');
const Stack = createStackNavigator();


const App = () => {
  const linking = {
    prefixes: [prefix, 'https://app.craftschoolship.com'],
  };



  const fontsLoaded = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AuthProvider>
          <NotificationProvider>

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

            <Stack.Screen
              options={{ headerBackTitleVisible: false }}
              name="Profile"
              component={ProfileScreen}
            />
          </Stack.Navigator>

          </NotificationProvider>
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
