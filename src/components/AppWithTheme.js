import { NativeBaseProvider, extendTheme } from "native-base";
import React from "react";
import { useThemeContext } from "../hooks/ThemeContext";
import AppNavigator from "../navigation/AppNavigator";
import customTheme from "../themes/customTheme";

export const AppWithTheme = () => {
  const { isDarkMode } = useThemeContext();
  const darkTheme = extendTheme({
    colors: {
      // primary: { 500: "#1abc9c" },
      primary: { 500: "#2b1b94" },
      background: "#000",
      text: "#fff",
    },
  });

  return (
    <NativeBaseProvider theme={isDarkMode ? darkTheme : customTheme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
};
