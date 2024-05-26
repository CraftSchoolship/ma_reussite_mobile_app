import React from "react";
import { Box, Image } from "native-base";

function Banner() {
  return (
    <Box bg={"primary.500"} mt={"20%"} mb={"20%"}>
      <Image
        mx={"auto"}
        source={require("../../../assets/images/ma_reussite.png")}
        alt="Alternate Text"
      />
    </Box>
  );
}

export default Banner;
