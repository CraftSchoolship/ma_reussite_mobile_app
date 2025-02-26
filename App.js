import React from "react";
import AppWithTheme from "./src/components/AppWithTheme";
import useFonts from "./src/hooks/useFonts";
import ThemeProvider from "./src/hooks/ThemeContext";


const App = () => {

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
      <AppWithTheme />
    </ThemeProvider>
  );
};

export default App;
