import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { getObject } from "../api/apiClient";
import { useAppContext } from "../hooks/AppProvider";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useThemeContext } from "../hooks/ThemeContext";

const HomeScreenBanner = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [connectedUser, setConnectedUser] = useState({
    sessionId: "",
    email: "",
    password: "",
    userid: "",
    role: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState();
  const { selectedChild, setSelectedChild } = useAppContext();
  const { isDarkMode } = useThemeContext();
  // const [imgBanner, setImgBanner] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getObject("connectedUser");
      setConnectedUser(user);
      if (connectedUser?.role === "parent") {
        const storedSelectedChild = await getObject("selectedChild");
        setSelectedChild(storedSelectedChild);
      }
      setLoading(false);
    };
    fetchUser();
  }, [connectedUser]);

  useEffect(() => {
    if (connectedUser?.role === "parent" && selectedChild?.contact_id) {
      setAccount(
        <Text color={"white"} fontWeight={"medium"}>
          {selectedChild?.contact_id[1]}
        </Text>
      );
    }
  }, [connectedUser?.role, selectedChild]);

  return (
    <Box bg={isDarkMode ? "black" : "white"}>
      <VStack>
        <HStack>
          <Image
            key={isDarkMode ? "dark" : "light"}
            size="sm"
            w={"70%"}
            ml={2}
            source={
              isDarkMode
                ? require("../../assets/images/ma_reussite_login_screen.png")
                : require("../../assets/images/ma_reussite_other_screens.png")
            }
            alt="Alternate Text"
          />
          <Pressable
            m={"auto"}
            onPress={() => navigation.openDrawer && navigation.openDrawer()}
          >
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
                  onPress={() =>
                    navigation.openDrawer && navigation.openDrawer()
                  }
                />
              </Avatar>
            )}
          </Pressable>
        </HStack>
        {connectedUser?.role === "parent" && selectedChild?.contact_id && (
          <Box
            alignSelf={"baseline"}
            ml={8}
            px={2}
            py={0.5}
            mb={1}
            borderRadius={"sm"}
            bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
          >
            {account}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default HomeScreenBanner;
