import React from "react";
import { Button, HStack, Spinner, Text } from "native-base";

const CustomButton = ({ onPress, title, isDisabled, loading = true }) => {
  return (
    <Button borderRadius={12} onPress={onPress} isDisabled={isDisabled}>
      {loading ? (
        <Text>{title}</Text>
      ) : (
        <HStack>
          <Text>{` ${title}`}</Text>
          <Spinner size="sm" color="white" />
        </HStack>
      )}
    </Button>
  );
};

export default CustomButton;
