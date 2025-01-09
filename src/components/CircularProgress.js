import React from "react";
import { Box, Text } from "native-base";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const CircularProgress = ({
  progress = 50,
  width = 10,
  size = 70,
  note = false,
  isDarkMode,
}) => {
  const getProgressColor = (value) => {
    if (value <= 10) return "red";
    if (value > 10 && value <= 15) return "yellow";
    if (value > 15 && value <= 20) return "green";
    return MA_REUSSITE_CUSTOM_COLORS.Secondary;
  };

  // Calculate fill progress
  const fillProgress = note ? (progress / 20) * 100 : progress;

  return (
    <Box alignItems={"center"} justifyContent={"center"}>
      <AnimatedCircularProgress
        size={size}
        width={width}
        fill={fillProgress}
        tintColor={
          note
            ? getProgressColor(progress)
            : MA_REUSSITE_CUSTOM_COLORS.Secondary
        }
        backgroundColor="#CED3DE"
        rotation={0}
        duration={3000}
        delay={500}
      >
        {() => (
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
            fontSize={"lg"}
            fontWeight={"bold"}
          >
            {note ? progress : `${progress}%`}
          </Text>
        )}
      </AnimatedCircularProgress>
    </Box>
  );
};

export default CircularProgress;
