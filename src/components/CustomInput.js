import React from "react";
import { Input, FormControl, Icon, Pressable, Text } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useField } from "formik";
import { useThemeContext } from "../hooks/ThemeContext";

const CustomInput = ({
  label,
  name,
  secureTextEntry,
  showPassword,
  setShowPassword,
  keyboardType = "default",
  inputRef,
  onSubmitEditing,
}) => {
  const [field, meta] = useField(name);
  const { value, onChange, onBlur } = field;
  const { error, touched } = meta;
  const { isDarkMode } = useThemeContext();

  return (
    <FormControl mt={"10%"} isInvalid={touched && !!error}>
      <FormControl.Label
        _text={{
          color: isDarkMode ? "white" : "black",
        }}
      >
        {label}
      </FormControl.Label>
      <Input
        ref={inputRef}
        keyboardType={keyboardType}
        autoCapitalize="none"
        returnKeyType="next"
        color={isDarkMode ? "white" : "black"}
        value={value}
        onChangeText={onChange(name)}
        borderColor={isDarkMode && "white"}
        onBlur={onBlur(name)}
        onSubmitEditing={onSubmitEditing}
        type={secureTextEntry && !showPassword ? "password" : "text"}
        InputRightElement={
          secureTextEntry ? (
            <Pressable onPress={() => setShowPassword(!showPassword)}>
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? "visibility" : "visibility-off"}
                  />
                }
                size={5}
                mr={2}
              />
            </Pressable>
          ) : null
        }
      />
      {touched && error && (
        <Text color="red.500" mt={2}>
          {error}
        </Text>
      )}
    </FormControl>
  );
};

export default CustomInput;
