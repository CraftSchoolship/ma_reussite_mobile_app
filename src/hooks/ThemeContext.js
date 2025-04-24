import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeBaseProvider, extendTheme } from "native-base";
import customTheme from "../themes/customTheme";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchDarkModePreference = async () => {
      const storedDarkMode = await AsyncStorage.getItem("darkMode");
      if (storedDarkMode !== null) {
        setIsDarkMode(JSON.parse(storedDarkMode));
      }
    };
    fetchDarkModePreference();
  }, []);

  const toggleDarkMode = async () => {
    setIsDarkMode((prevState) => !prevState);
    await AsyncStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
  };

  const darkTheme = extendTheme({
    colors: {
      primary: { 500: "#2b1b94" },
      background: "#000",
      text: "#fff",
    },
  });

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <NativeBaseProvider theme={isDarkMode ? darkTheme : customTheme}>
        {children}
      </NativeBaseProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
export default ThemeProvider;