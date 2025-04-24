import React, { useEffect, useState } from "react";
import { Box, HStack, Avatar, Text, Image, Pressable, VStack, IconButton , Icon} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../hooks/AppProvider";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useThemeContext } from "../hooks/ThemeContext";
import { useAuth } from "../utils/AuthContext";
import { getUserInfo } from "../utils/AuthService";


const HomeScreenBanner = ({ displayGoBackButton = false, previous }) => {
  const navigation = useAuth();
  const drawer = useNavigation();
  const [connectedUser, setConnectedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { selectedChild, setSelectedChild } = useAppContext();
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserInfo();
      setConnectedUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (selectedChild?.name) {
    }
  }, [selectedChild]);

  return (
    <Box
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White
      }
      pb={4}
    >
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
          <Pressable m={"auto"} onPress={() => drawer.openDrawer()}>
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
                  onPress={() => drawer.openDrawer()}
                />
              </Avatar>
            )}
          </Pressable>
        </HStack>
        {connectedUser?.role === "parent" && selectedChild?.name && (
          <Box
            alignSelf={"baseline"}
            ml={8}
            px={2}
            py={0.5}
            mb={1}
            borderRadius={"sm"}
            bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
          >
            {selectedChild.name}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default HomeScreenBanner;
