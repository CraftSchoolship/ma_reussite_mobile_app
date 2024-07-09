import React from "react";
// import { View, Text } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { Box, Text } from "native-base";

const CircularProgress = ({ progress }) => {
  return (
    <Box alignItems={"center"} justifyContent={"center"}>
      <AnimatedCircularProgress
        size={70}
        width={10}
        // fill={progress}
        tintColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
        backgroundColor="#CED3DE"
        rotation={0}
        duration={3000}
        delay={500}
      >
        {() => (
          <Text color={"black"} fontSize={"lg"} fontWeight={"bold"}>
            {progress}%
          </Text>
        )}
      </AnimatedCircularProgress>
    </Box>
  );
};

export default CircularProgress;
