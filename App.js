import React from "react";
import AppWithTheme from "./src/components/AppWithTheme";
import useFonts from "./src/hooks/useFonts";
import ThemeProvider from "./src/hooks/ThemeContext";
import * as Linking from "expo-linking";

const prefix = Linking.createURL("/");
const linking = {
  prefixes: [prefix, "https://app.craftschoolship.com"],
};
const App = () => {
  const url = Linking.useURL();

  if (url) {
    const { hostname, path, queryParams } = Linking.parse(url);

    console.log(
      `Linked to app with hostname: ${hostname}, path: ${path} and data: ${JSON.stringify(
        queryParams
      )}`
    );
  }
  const fontsLoaded = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
};

export default App;
