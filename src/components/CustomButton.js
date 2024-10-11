import React from "react";
import { Button, HStack, Spinner, Text } from "native-base";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const CustomButton = ({ onPress, title, isDisabled, loading = true }) => {
  return (
    <Button borderRadius={12} onPress={onPress} isDisabled={isDisabled}>
      {loading ? (
        <Text color={"white"}>{title}</Text>
      ) : (
        <HStack>
          <Spinner size="sm" color="white" />
          <Text color={"white"}>{` ${title}`}</Text>
        </HStack>
      )}
    </Button>
  );
};

export default CustomButton;
