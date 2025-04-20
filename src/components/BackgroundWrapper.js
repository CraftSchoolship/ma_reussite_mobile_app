import React from "react";
import { ImageBackground } from "react-native";
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
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top + 20,
        backgroundColor: isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White,
      }}
    >
      {isDarkMode ? (
        <StatusBar barStyle={"light-content"} backgroundColor={"black"} />
      ) : (
        <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      )}
      {isLoginScreen ? null : (
        <HomeScreenBanner
          navigation={navigation}
          selectedChild={selectedChild}
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
    </View>
  );
};

export default BackgroundWrapper;
