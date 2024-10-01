import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Checkbox,
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
import { getObject, storeObject } from "../api/apiClient";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useThemeContext } from "../hooks/ThemeContext";

const CustomDrawerContent = ({ connectedUser, ...props }) => {
  const [childrenList, setChildrenList] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();
  const { isDarkMode, toggleDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (connectedUser.role === "parent") {
          const children = await getObject("children");
          setChildrenList(children || []);

          const storedChild = await getObject("selectedChild");
          setSelectedChild(storedChild || {});
        }
      } catch (error) {
        console.error("Error fetching connectedUser data:", error);
      }
    };

    if (childrenList?.length < 1) fetchUserData();
  }, [childrenList]);

  return (
    <>
      <DrawerContentScrollView {...props}>
        <VStack
          key={isDarkMode ? "dark" : "light"}
          // bg={"black"}
        >
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
            // bgColor={"gray.800"}
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
                  props.navigation.navigate("Profil", { edit: false })
                }
              >
                <Avatar
                  size="sm"
                  bg="blue.500"
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
                      props.navigation.navigate("Profil", { edit: false })
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
                {connectedUser?.selfId?.[1] || "Prénom Nom"}
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
                  onPress={async () => {
                    try {
                      await storeObject("selectedChild", child);
                      setSelectedChild(child);
                      props.navigation.navigate("Home", { child });
                    } catch (error) {
                      console.error("Error while selecting child:", error);
                    }
                  }}
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
                          uri:
                            `data:image/png;base64,${child.image_1024}` || null,
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
                        {child.contact_id[1]}
                      </Text>
                    </HStack>
                    {child.id === selectedChild?.id ? (
                      <Checkbox
                        value="checkboxValue"
                        colorScheme={MA_REUSSITE_CUSTOM_COLORS.CheckBoxColor}
                        aria-label="label"
                        size={"sm"}
                        isChecked
                      />
                    ) : null}
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
          AsyncStorage.clear();
          props.navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }}
      />
      {/* <DrawerItem
        label={"Sessions"}
        labelStyle={{
          textAlign: "center",
          color: "#fff",
          width: "115%",
        }}
        style={{
          backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
          alignContent: "center",
        }}
        px={4}
        w={"100%"}
        bottom={"10%"}
        onPress={() => props.navigation.navigate("Session")}
      /> */}
    </>
  );
};

export default CustomDrawerContent;
