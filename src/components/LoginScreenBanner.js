import React from "react";
import { Box, Image, Platform } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

function LoginScreenBanner() {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useThemeContext();

  return (
    <>
      <StatusBar
        backgroundColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      {/* {isDarkMode ? (
        <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      ) : (
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      )} */}
      <Box style={{ paddingTop: insets.top }}>
        <Image
          size="sm"
          w={"full"}
          backgroundColor={MA_REUSSITE_CUSTOM_COLORS.Primary}
          resizeMode="contain"
          padding={10}
          source={require("../../assets/images/ma_reussite_login_screen.png")}
          alt="Alternate Text"
        />
      </Box>
    </>
  );
}

export default LoginScreenBanner;
