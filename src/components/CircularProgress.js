import React from "react";
import { Box, Text } from "native-base";
import CircularProgress from "react-native-circular-progress-indicator";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { Platform } from "react-native";

const CustomCircularProgress = ({
  progress = 50,
  size = 80,
  note = false,
  isDarkMode,
}) => {
  const getProgressColor = (value) => {
    if (value <= 10) return "red";
    if (value > 10 && value <= 15) return "yellow";
    if (value > 15 && value <= 20) return "green";
    return MA_REUSSITE_CUSTOM_COLORS.Secondary;
  };

  const value = note ? progress : progress;
  const maxValue = note ? 20 : 100;

  return (
    <Box alignItems="center" justifyContent="center">
      <CircularProgress
        value={value}
        radius={size / 2}
        duration={100}
        maxValue={maxValue}
        progressValueColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.White
            : MA_REUSSITE_CUSTOM_COLORS.Black
        }
        activeStrokeColor={
          note
            ? getProgressColor(progress)
            : MA_REUSSITE_CUSTOM_COLORS.Secondary
        }
        inActiveStrokeColor="#CED3DE"
        inActiveStrokeOpacity={0.5}
        title=""
        progressValueFontSize={16}
        activeStrokeWidth={10}
        inActiveStrokeWidth={10}
      />
    </Box>
  );
};

export default CustomCircularProgress;
