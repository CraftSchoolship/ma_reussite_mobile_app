import React, { useEffect, useState } from "react";
import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  Text,
  VStack,
} from "native-base";

const ToastAlert = ({
  status,
  variant,
  title,
  description,
  isClosable,
  duration, // Durée en millisecondes
  ...rest
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!isVisible) return null;

  return (
    <Alert
      maxWidth="100%"
      mx={4}
      alignSelf="center"
      flexDirection="row"
      status={status ? status : "info"}
      variant={variant}
      {...rest}
    >
      <VStack space={1} flexShrink={1} w="100%">
        <HStack
          flexShrink={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text
              fontSize="md"
              fontWeight="medium"
              flexShrink={1}
              color={
                variant === "solid"
                  ? "lightText"
                  : variant !== "outline"
                  ? "darkText"
                  : null
              }
            >
              {title}
            </Text>
          </HStack>
          {isClosable ? (
            <IconButton
              variant="unstyled"
              icon={<CloseIcon size="3" />}
              _icon={{
                color: variant === "solid" ? "lightText" : "darkText",
              }}
              onPress={() => setIsVisible(false)}
            />
          ) : null}
        </HStack>
        <Text
          px="6"
          color={
            variant === "solid"
              ? "lightText"
              : variant !== "outline"
              ? "darkText"
              : null
          }
        >
          {description}
        </Text>
      </VStack>
    </Alert>
  );
};

export default ToastAlert;
