import { MaterialIcons } from "@expo/vector-icons";
import { Avatar, Button, HStack, Icon, IconButton, Text } from "native-base";
import React from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

export const ChildItem = ({ item, navigation, connectedUser }) => {
  return (
    <Button
      bg={MA_REUSSITE_CUSTOM_COLORS.Primary}
      px={4}
      py={2}
      my={2}
      rounded={10}
      justifyContent={"space-between"}
      onPress={() => navigation?.navigate("DrawerNavigator", { connectedUser })}
      // onPress={() => console.log("User Id", item.id)}
    >
      <HStack bg={MA_REUSSITE_CUSTOM_COLORS.Primary}>
        <Avatar
          size="md"
          mr={4}
          source={{
            uri: item?.image_256 || null,
          }}
          bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
        >
          <IconButton
            icon={
              <Icon
                as={MaterialIcons}
                name="person"
                size="2xl"
                color="white"
                mx={"auto"}
              />
            }
            borderRadius="full"
            _icon={{
              color: "white",
              size: "xs",
            }}
          />
        </Avatar>
        <Text
          color={MA_REUSSITE_CUSTOM_COLORS.White}
          my={"auto"}
          fontSize={"md"}
          borderRadius={10}
        >
          {item.name}
        </Text>
      </HStack>
    </Button>
  );
};
