import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import HomeScreenBanner from "./HomeScreenBanner";
import { StatusBar, View } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useThemeContext } from "../hooks/ThemeContext";

const BackgroundWrapper = ({
  children,
  selectedChild,
  navigation,
  listOfChildren,
  isLoginScreen = false,
}) => {
  const { isDarkMode } = useThemeContext();
  return (
    <SafeAreaView>
      {isDarkMode ? (
        <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      ) : (
        <StatusBar barStyle={"dark-content"} />
      )}
      {isLoginScreen ? null : (
        <HomeScreenBanner
          navigation={navigation}
        />
      )}
      <ImageBackground
        style={{
          minHeight: "100%",
        }}
        resizeMode="cover"
        source={
          isDarkMode
            ? require("../../assets/images/ma_reussite_background_dark.png")
            : require("../../assets/images/ma_reussite_background_1.png")
        }
      >
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

export default BackgroundWrapper;
