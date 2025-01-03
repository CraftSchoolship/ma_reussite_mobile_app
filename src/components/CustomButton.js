import React from "react";
import { Button, HStack, Spinner, Text, Image } from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const CustomButton = ({
  onPress,
  title,
  isDisabled,
  loading = true,
  style = {},
  icon,
}) => {
  return (
    <Button
      onPress={onPress}
      isDisabled={isDisabled}
      style={{ height: 48, borderRadius: 12, ...style }}
      bg={MA_REUSSITE_CUSTOM_COLORS.Primary}
    >
      {!loading ? (
        <HStack alignItems="right" space={6}>
          {icon && (
            <Image
              source={icon}
              alt="icon"
              size={6} // Adjust the size as needed
              resizeMode="contain"
            />
          )}
          <Text color={"white"}>{title}</Text>
        </HStack>
      ) : (
        <HStack alignItems="center">
          <Spinner size="sm" color="white" />
        </HStack>
      )}
    </Button>
  );
};
export default CustomButton;
