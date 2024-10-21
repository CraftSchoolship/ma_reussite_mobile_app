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
      toValue: isFocused ? 5 : 5,
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
    justifyContent: "flex-end",
  },
  focusedCircle: {
    width: 80,
    height: 78,
    borderRadius: 90,
    backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
    paddingTop: 30,
  },
});
