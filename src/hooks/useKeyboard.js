import React from "react";
import {
  Keyboard,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";

const KeyboardDismissWrapper = ({ children, ...props }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View {...props} style={[{ flex: 1 }, props.style]}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default KeyboardDismissWrapper;
