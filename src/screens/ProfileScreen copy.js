import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Center,
  Checkbox,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { getObject, storeObject } from "../api/apiClient";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const ProfileScreen = () => {
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

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getObject("connectedUser");
      setConnectedUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <Box flex={1} bg="white">
      <Center mt={2}>
        {loading ? (
          <Avatar
            size="2xl"
            source={{
              uri: "https://placehold.co/400x400.png",
            }}
            onError={(e) => {
              console.error("Error displaying image:", e.nativeEvent.error);
            }}
          />
        ) : (
          <Avatar
            size="xl"
            bg="blue.500"
            source={{
              uri: connectedUser?.profileImage || null,
            }}
            bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
          >
            <Avatar.Badge
              bg="white"
              borderWidth={0}
              position="absolute"
              bottom={0.5}
              right={0.5}
              size={6}
            >
              <IconButton
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="edit"
                    size={4}
                    color="black"
                    position="absolute"
                    top={0.5}
                    left={0.5}
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
            </Avatar.Badge>
            <IconButton
              icon={
                <Icon
                  as={MaterialIcons}
                  name="person"
                  size="6xl"
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
        )}
        <Heading color={"black"} mt={2}>
          {connectedUser && connectedUser.userid[1]}
        </Heading>
      </Center>
      <ScrollView
        mt={2}
        space={2}
        flexGrow={1}
        h={"100%"}
        w={"100%"}
        mb={"10%"}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Box mt={4}>
          <Heading mx={4} color={"black"} size="md">
            Contact
          </Heading>
          <Box h={"100%"} justifyContent={"space-between"}>
            <VStack mx={4}>
              <Text mt={2} color={"black"} bold>
                Adresse email :
              </Text>
              <Link href={connectedUser && connectedUser.email}>
                <Text color={"primary.500"}>
                  {connectedUser && connectedUser.email}
                </Text>
              </Link>
            </VStack>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ProfileScreen;
