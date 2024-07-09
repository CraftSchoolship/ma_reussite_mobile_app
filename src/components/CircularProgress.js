import React from "react";
import { Box, Text } from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const CircularProgress = ({ progress = 0 }) => {
  return (
    <Box alignItems={"center"} justifyContent={"center"}>
      <AnimatedCircularProgress
        size={70}
        width={10}
        fill={progress}
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
