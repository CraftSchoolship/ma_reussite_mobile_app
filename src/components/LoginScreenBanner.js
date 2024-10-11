import React from "react";
import { Box, Image, Platform } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

function LoginScreenBanner() {
  const insets = useSafeAreaInsets();
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Box style={{ paddingTop: insets.top }}>
        <Image
          size="sm"
          w={"100%"}
          backgroundColor="primary.500"
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
