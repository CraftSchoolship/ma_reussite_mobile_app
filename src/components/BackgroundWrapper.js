import React from "react";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import HomeScreenBanner from "./HomeScreenBanner";
import { StatusBar, View } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BackgroundWrapper = ({
  children,
  selectedChild,
  navigation,
  listOfChildren,
  // role,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top }}>
      <HomeScreenBanner
        // role={role}
        listOfChildren={listOfChildren}
        selectedChild={selectedChild}
        navigation={navigation}
      />
      <ImageBackground
        style={styles.background}
        source={require("../../assets/images/ma_reussite_background.png")}
      >
        {children}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    resizeMode: "contain",
    minHeight: "100%",
  },
});

export default BackgroundWrapper;
