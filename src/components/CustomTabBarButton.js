import React, { useEffect, useRef } from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
const CustomTabBarButton = ({ children, accessibilityState, onPress }) => {
  const isFocused = accessibilityState.selected;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: isFocused ? -16 : 0,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Animated.View
          style={[
            isFocused && styles.focusedCircle,
            { transform: [{ translateY }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CustomTabBarButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  focusedCircle: {
    width: 75,
    height: 75,
    borderRadius: 50,
    backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
    borderColor: "white",
  },
});
