import React from "react";
import { Box, Image } from "native-base";

function LoginScreenBanner() {
  return (
    <Box bg={"primary.500"}>
      <Image
        size="sm"
        w={"70%"}
        mx={"auto"}
        resizeMode="contain"
        padding={20}
        source={require("../../assets/images/ma_reussite_login_screen.png")}
        alt="Alternate Text"
      />
    </Box>
  );
}

export default LoginScreenBanner;
