import React from "react";
import { Box, Image } from "native-base";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

function LoginScreenBanner() {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useThemeContext();

  return (
    <>
      <Box
        style={{
          paddingTop: insets.top ,
          backgroundColor: isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White,
        }}
      >
        <Image
          size="md"
          w={"full"}
          backgroundColor={MA_REUSSITE_CUSTOM_COLORS.Primary}
          resizeMode="contain"
          source={require("../../assets/images/ma_reussite_login_screen.png")}
          alt="Alternate Text"
        />
      </Box>
    </>
  );
}

export default LoginScreenBanner;
