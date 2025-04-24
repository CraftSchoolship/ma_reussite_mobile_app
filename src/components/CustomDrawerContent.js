import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Avatar,
  Box,
  Divider,
  HStack,
  Icon,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Switch,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useThemeContext } from "../hooks/ThemeContext";
import { browse, logout } from "../../http/http";
import { getUserInfo, wrapProfileImageBase64 } from "../utils/AuthService";

const CustomDrawerContent = ({ ...props }) => {
  const [childrenList, setChildrenList] = useState([]);
  const [user, setUser] = useState([]);
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = await getUserInfo();
      setUser(user);

      if (user.craft_role !== "parent")
        return;

      try {
        const craftParentChildLines = await browse(
          "craft.parent.child.line",
          ["child_id"],
          { parent_id: user.craft_parent_id[0] }
        );

        const studentIds = craftParentChildLines.map((child) => child.child_id[0]);

        if (studentIds.length === 0) return [];

        const children = await browse(
          "craft.student",
          ["id", "name", "image_128"],
          { id_in: studentIds.join(",") }
        );

        setChildrenList(children.map((child) => ({
          ...child,
          image_128: wrapProfileImageBase64(child.image_128),
        })));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <>
      <DrawerContentScrollView {...props}>
        <VStack key={isDarkMode ? "dark" : "light"}>
          <HStack px={4} py={2} justifyContent={"space-between"}>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              bold
            >
              Compte utilisateur
            </Text>
            <Pressable
              w={10}
              alignItems={"flex-end"}
              onPress={() => props.navigation.closeDrawer()}
            >
              <Text bold>
                <FontAwesome6
                  name={"rectangle-xmark"}
                  size={16}
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                />
              </Text>
            </Pressable>
          </HStack>
          <Divider
            bgColor={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
                : MA_REUSSITE_CUSTOM_COLORS.LightDivider
            }
            h={1}
            mb={2}
          />
          <VStack>
            <Box alignItems="center" mb={4} bg={"primary.500"} h={60}>
              <Image
                h={"100%"}
                w={"100%"}
                resizeMode="contain"
                source={require("../../assets/images/ma_reussite_login_screen.png")}
                alt="Alternate Text"
              />
            </Box>

            <HStack alignItems="center" mx={4}>
              <Pressable
                onPress={() =>
                  props.navigation.navigate("Profile", { edit: false })
                }
              >
                <Avatar
                  size="sm"
                  bg="blue.500"
                  source={{
                    uri: user?.avatar || null,
                  }}
                  bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
                >
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
                      // size: "xs",
                    }}
                    _pressed={{
                      bg: "primary.600:alpha.20",
                    }}
                    onPress={() =>
                      props.navigation.navigate("Profile", { edit: false })
                    }
                  />
                </Avatar>
              </Pressable>
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                fontSize="lg"
                bold
                ml={4}
              >
                {user?.name || "Prénom Nom"}
              </Text>
              <Pressable
                onPress={() =>
                  props.navigation.navigate("Profil", { edit: true })
                }
                ml={"auto"}
              >
                <Text>
                  <FontAwesome6
                    name={"pen-to-square"}
                    size={16}
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                  />
                </Text>
              </Pressable>
            </HStack>
          </VStack>
          <Divider
            bgColor={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
                : MA_REUSSITE_CUSTOM_COLORS.LightDivider
            }
            h={1}
            my={2}
          />

          <HStack justifyContent={"space-between"} alignItems="center" ml={4}>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
            >
              Mode sombre
            </Text>
            <Switch
              size="md"
              colorScheme={"success"}
              isChecked={isDarkMode}
              onToggle={toggleDarkMode}
            />
          </HStack>
          <Divider
            bgColor={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
                : MA_REUSSITE_CUSTOM_COLORS.LightDivider
            }
            h={1}
            my={2}
          />

          <ScrollView mt={2}>
            {childrenList &&
              childrenList.map((child, index) => (
                <Pressable
                  py={2}
                  my={1}
                  key={index}
                  bgColor={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
                      : MA_REUSSITE_CUSTOM_COLORS.LightDivider
                  }
                >
                  <HStack
                    px={4}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <HStack alignItems={"center"}>
                      <Avatar
                        size="sm"
                        mr={2}
                        source={{
                          uri: `${child.image_128}` || null,
                        }}
                        bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
                      >
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
                      <Text
                        color={
                          isDarkMode
                            ? MA_REUSSITE_CUSTOM_COLORS.White
                            : MA_REUSSITE_CUSTOM_COLORS.Black
                        }
                        fontSize={"md"}
                      >
                        {child.name}
                      </Text>
                    </HStack>
                  </HStack>
                </Pressable>
              ))}
          </ScrollView>
        </VStack>
      </DrawerContentScrollView>
      <Divider
        bgColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
            : MA_REUSSITE_CUSTOM_COLORS.LightDivider
        }
        h={1}
        bottom={"10%"}
      />
      <DrawerItem
        label={"Déconnexion"}
        labelStyle={{
          textAlign: "center",
          color: "#fff",
          width: "115%",
        }}
        style={{
          backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Danger,
          alignContent: "center",
        }}
        px={4}
        w={"100%"}
        bottom={"10%"}
        onPress={() => {
          logout();
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }}
      />
    </>
  );
};

export default CustomDrawerContent;
