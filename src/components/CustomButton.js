import React from "react";
import { Button, HStack, Spinner, Text } from "native-base";

const CustomButton = ({ onPress, title, isDisabled, loading = true }) => {
  return (
    <Button
      onPress={onPress}
      isDisabled={isDisabled}
      style={{ height: 48, borderRadius: 12 }}
    >
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
