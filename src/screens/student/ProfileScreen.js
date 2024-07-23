import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Button,
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
import { jsonrpcRequest } from "../../api/apiClient";
import config from "../../api/config";

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [sessionId, setSessionId] = useState(null);
  const [password, setPassword] = useState(null);
  const [partnerid, setPartnerid] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [listOfChildren, setListOfChildren] = useState(null);
  const [avatarUri, setAvatarUri] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [userInformation, setUserInformation] = useState();

  useEffect(() => {
    const {
      sessionId,
      password,
      partnerid,
      selectedChild,
      listOfChildren,
      user,
    } = route?.params;
    setSessionId(sessionId);
    setPassword(password);
    setPartnerid(partnerid);
    setSelectedChild(selectedChild);
    setListOfChildren(listOfChildren);
    setUser(user);
  }, [route]);

  useEffect(() => {
    console.log("(ProfileScreen) - selectedChild...", selectedChild);
    console.log("(ProfileScreen) - listOfChildren...", listOfChildren);

    const loadProfileImage = async () => {
      try {
        const cachedAvatar = await AsyncStorage.getItem("image_1024");
        if (cachedAvatar) {
          setAvatarUri(`data:image/png;base64,${cachedAvatar}`);
        }
        let userData = [];
        switch (user && user) {
          case "parent":
            userData = await jsonrpcRequest(
              sessionId,
              config.password,
              config.model.parents,
              [[["contact_id", "=", partnerid]]],
              ["image_1024", "name", "email"]
            );
            break;

          default:
            userData = await jsonrpcRequest(
              sessionId,
              config.password,
              config.model.opStudent,
              [[["partner_id", "=", partnerid]]],
              ["image_1024", "name", "email"]
            );
            break;
        }

        console.log("(Profile) - userData...", userData);
        console.log("(Profile) - listOfChildren...", listOfChildren);

        if (userData.length > 0) {
          const { image_1024, name, email } = userData[0];
          setUserInformation({
            name: name,
            email: email,
          });
          if (userData[0].image_1024) {
            const base64Image = image_1024;
            const newAvatarUri = `data:image/png;base64,${base64Image}`;

            if (newAvatarUri !== avatarUri) {
              setAvatarUri(newAvatarUri);
              await AsyncStorage.setItem("image_1024", base64Image);
            }
          }
        } else {
          await AsyncStorage.removeItem("image_1024");
          console.log("No avatar found for the user.");
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId && password && partnerid) {
      loadProfileImage();
    }
  }, [sessionId, password, partnerid, avatarUri, listOfChildren]);

  return (
    <Box flex={1} bg="white">
      <Center>
        {loading ? (
          <Avatar
            size="2xl"
            source={{ uri: "https://placehold.co/400x400.png" }}
            onError={(e) => {
              console.error("Error displaying image:", e.nativeEvent.error);
            }}
          />
        ) : (
          <Avatar
            size="2xl"
            source={{ uri: avatarUri }}
            onError={(e) => {
              console.error("Error displaying image:", e.nativeEvent.error);
            }}
          >
            <Avatar.Badge
              bg="white"
              borderWidth={0}
              position="absolute"
              bottom={0}
              right={0}
              size={10}
            >
              <IconButton
                icon={
                  <Icon
                    as={MaterialIcons}
                    name="edit"
                    size="lg"
                    color="black"
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
            </Avatar.Badge>
          </Avatar>
        )}
        <Heading color={"black"} mt={2}>
          {userInformation && userInformation.name}
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
              <Link href={userInformation && userInformation.email}>
                <Text color={"primary.500"}>
                  {userInformation && userInformation.email}
                </Text>
              </Link>
            </VStack>

            {listOfChildren &&
              listOfChildren.map((child, index) => (
                <Pressable py={4} key={index} bgColor={"gray.100"}>
                  <HStack px={4} justifyContent={"space-between"}>
                    <Text color={"black"} textAlign={"center"}>
                      Name : {child.partner_id[1]}, Partner ID:{" "}
                      {child.partner_id[0]}, ID: {child.id}
                    </Text>
                    {child.id === selectedChild.id ? (
                      <Checkbox
                        value="danger"
                        colorScheme="success"
                        aria-label="label"
                        size={"md"}
                        accessibilityLabel="This is a dummy checkbox"
                        defaultIsChecked
                      />
                    ) : (
                      ""
                    )}
                  </HStack>
                  {console.log("selectedChild...", selectedChild)}
                </Pressable>
              ))}
          </Box>
        </Box>
      </ScrollView>
      <Box bottom={"5%"}>
        <Button
          mx={"auto"}
          bgColor={"danger.600"}
          w={"80%"}
          onPress={() => {
            AsyncStorage.clear();
            navigation.navigate("Login");
          }}
        >
          Déconnexion
        </Button>
      </Box>
    </Box>
  );
};

export default ProfileScreen;
