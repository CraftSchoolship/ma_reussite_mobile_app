import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/navigation/AppNavigator";
import customTheme from "./src/themes/customTheme";
import AppLoading from "expo-app-loading";
import useFonts from "./src/hooks/useFonts";

const App = () => {
  const fontsLoaded = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NativeBaseProvider theme={customTheme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
