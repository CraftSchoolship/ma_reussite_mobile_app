import {
  Avatar,
  Box,
  Button,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Text,
} from "native-base";
import React from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { MaterialIcons } from "@expo/vector-icons";
import { useThemeContext } from "../hooks/ThemeContext";
import { connectedUser } from "../../http/http";
import { LoginScreenBanner } from "../components";

const ChildItem = ({ item }) => {
  return (
    <Button
      bg={MA_REUSSITE_CUSTOM_COLORS.Primary}
      px={4}
      py={2}
      my={2}
      rounded={10}
      justifyContent={"space-between"}
    >
      <HStack bg={MA_REUSSITE_CUSTOM_COLORS.Primary}>
        <Avatar
          size="md"
          mr={4}
          source={{
            uri: connectedUser?.profileImage || null,
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

const mockChildren = [
  { id: "1", name: "Mohammed Mohamed" },
  { id: "2", name: "Samir Tata" },
  { id: "3", name: "Sami Yangui" },
];

const ChildrenScreen = () => {
  const { isDarkMode } = useThemeContext();

  return (
    <Box
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White
      }
      flex={1}
    >
      <LoginScreenBanner />
      <Text
        color={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.White
            : MA_REUSSITE_CUSTOM_COLORS.Black
        }
        fontWeight={"bold"}
        fontSize={"2xl"}
        textAlign={"center"}
        my={"1/6"}
      >
        Choisir le Compte
      </Text>
      <Box mx={"auto"} w={"4/6"} flex={1}>
        <FlatList
          data={mockChildren}
          renderItem={ChildItem}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </Box>
  );
};

export default ChildrenScreen;
