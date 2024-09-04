import { MaterialIcons } from "@expo/vector-icons";
import {
  Avatar,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
} from "native-base";
import React from "react";
import { storeObject } from "../api/apiClient";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

export const ChildItem = (child, index) => (
  <Pressable
    py={2}
    my={1}
    key={index}
    bgColor={"gray.200"}
    onPress={async () => {
      try {
        await storeObject("selectedChild", child);
        setSelectedChild(child);
        props.navigation.navigate("Home", { selectedChild: child });
      } catch (error) {
        console.error("Error while selecting child:", error);
      }
    }}
  >
    <HStack px={4} justifyContent={"space-between"}>
      <HStack>
        <Avatar size="sm" mr={2} bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}>
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="person"
                size="lg"
                color="white"
                mx={"auto"}
              />
            }
            borderRadius="full"
            _icon={{
              color: "white",
              size: "xs",
            }}
            _pressed={{
              bg: "primary.600:alpha.20",
            }}
          />
        </Avatar>
        <Text color={"black"} fontWeight={"bold"} fontSize={"lg"}>
          {child.contact_id[1]}
        </Text>
      </HStack>
      {child.id === selectedChild?.id ? (
        <Checkbox
          value="danger"
          colorScheme="white"
          aria-label="label"
          size={"md"}
          accessibilityLabel="Selected Child Checkbox"
          isChecked
        />
      ) : null}
    </HStack>
  </Pressable>
);
