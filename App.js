import React, { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/navigation/AppNavigator";
import customTheme from "./src/themes/customTheme";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "./src/hooks/useFonts";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const fontsLoaded = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Afficher un écran de chargement ou null
  }

  return (
    <NativeBaseProvider theme={customTheme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
