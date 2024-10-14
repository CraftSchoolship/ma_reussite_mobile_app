import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Center,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
  Text,
  VStack,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { getObject } from "../api/apiClient";
import { useAppContext } from "../hooks/AppProvider";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useThemeContext } from "../hooks/ThemeContext";

const HomeScreenBanner = ({ displayGoBackButton = false, previous }) => {
  const route = useRoute();
  const navigation = useNavigation();
  const [connectedUser, setConnectedUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    self: "",
    role: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const { selectedChild, setSelectedChild } = useAppContext();
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getObject("connectedUser");
      setConnectedUser(
        user || {
          id: "",
          name: "",
          email: "",
          password: "",
          self: "",
          role: "",
          profileImage: null,
        }
      );
      if (user?.role === "parent") {
        const storedSelectedChild = await getObject("selectedChild");
        setSelectedChild(storedSelectedChild);
      }
      setLoading(false);
    };
    fetchUser();
  }, [connectedUser.id]);

  return (
    <Box bg={isDarkMode ? "black" : "white"}>
      <VStack>
        <HStack>
          {displayGoBackButton ? (
            <IconButton
              position={"absolute"}
              top={0}
              left={-12}
              icon={
                <MaterialIcons
                  name="chevron-left"
                  size={44}
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                />
              }
              onPress={() => navigation.navigate(previous)}
            />
          ) : null}
          <Image
            key={isDarkMode ? "dark" : "light"}
            size="sm"
            w={"70%"}
            ml={displayGoBackButton ? 6 : 2}
            source={
              isDarkMode
                ? require("../../assets/images/ma_reussite_login_screen.png")
                : require("../../assets/images/ma_reussite_other_screens.png")
            }
            alt="Alternate Text"
          />
          <Pressable m={"auto"} onPress={() => navigation.openDrawer()}>
            {loading ? (
              <Avatar size="md" source={{ uri: null }} />
            ) : (
              <Avatar
                size="md"
                mr={2}
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
                  _pressed={{
                    bg: "primary.600:alpha.20",
                  }}
                  onPress={() => navigation.openDrawer()}
                />
              </Avatar>
            )}
          </Pressable>
        </HStack>
        {connectedUser?.role === "parent" && selectedChild?.contact_id && (
          <Box
            alignSelf={"baseline"}
            mx={8}
            px={2}
            py={0.5}
            my={1}
            borderRadius={"sm"}
            bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
          >
            <Pressable m={"auto"} onPress={() => navigation.openDrawer()}>
              <HStack>

              {loading ? (
                <Avatar size="sm" source={{ uri: null }} />
              ) : (
                <Avatar
                  size="sm"
                  mr={4}
                  my={1}
                  source={{
                    uri: selectedChild?.image_256,
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
                    _pressed={{
                      bg: "primary.600:alpha.20",
                    }}
                    onPress={() => navigation.openDrawer()}
                  />
                </Avatar>
              )}
              <Text color={"white"} fontWeight={"medium"} fontSize={22} my={1}>
                {selectedChild?.name}
              </Text>
              </HStack>
            </Pressable>
            </Box>
          )}
        </VStack>
      </Box>
  );
};

export default HomeScreenBanner;
