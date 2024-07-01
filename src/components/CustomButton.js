import React from "react";
import { Button } from "native-base";

const CustomButton = ({ onPress, title, isDisabled }) => {
  return (
    <Button onPress={onPress} isDisabled={isDisabled} mt={"15%"}>
      {title}
    </Button>
  );
};

export default CustomButton;
