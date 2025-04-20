import React from "react";
import { Button, HStack, Text, Image } from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const CustomButton = ({
  onPress,
  title,
  isDisabled,
  loading = true,
  style = {},
  icon,
  isMicrosoftButton = false,
  isDarkMode = false,
}) => {
  const buttonBgColor = isMicrosoftButton
    ? isDarkMode
      ? "white"
      : "black"
    : MA_REUSSITE_CUSTOM_COLORS.Primary;
  const textColor = isMicrosoftButton
    ? isDarkMode
      ? "black"
      : "white"
    : "white";

  return (
    <Button
      onPress={onPress}
      isDisabled={isDisabled}
      style={{ height: 48, borderRadius: 12, ...style }}
      bg={buttonBgColor}
    >
      {!loading ? (
        <HStack alignItems="center" space={6}>
          {icon && (
            <Image
              source={icon}
              alt="icon"
              size={6} // Adjust the size as needed
              resizeMode="contain"
            />
          )}
          <Text color={textColor}>{title}</Text>
        </HStack>
      ) : (
        <HStack alignItems="center">
          <Text fontSize="lg" color={textColor} >
            Chargement...
         </Text>
        </HStack>
      )}
    </Button>
  );
};

export default CustomButton;
