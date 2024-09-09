import { MaterialIcons, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  Center,
  Heading,
  Icon,
  IconButton,
  Link,
  ScrollView,
  VStack,
  Text,
  Actionsheet,
  useDisclose,
  Button,
  HStack,
  Divider,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { getObject, storeObject } from "../api/apiClient";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { isOpen, onOpen, onClose } = useDisclose();
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

  const handleProfileImagePress = () => {
    onOpen();
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissions requises",
        "Vous devez autoriser l'accès à la galerie."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedUser = {
        ...connectedUser,
        profileImage: result.assets[0].uri,
      };
      setConnectedUser(updatedUser);
      await storeObject("connectedUser", updatedUser);
    }
    onClose();
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permissions requises",
        "Vous devez autoriser l'accès à la caméra."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedUser = {
        ...connectedUser,
        profileImage: result.assets[0].uri,
      };
      setConnectedUser(updatedUser);
      await storeObject("connectedUser", updatedUser); 
    }
    onClose();
  };

  return (
    <Box flex={1} bg="white">
      <Center py={3}>
        {loading ? (
          <Avatar
            size="2xl"
            source={{
              uri: "https://placehold.co/400x400.png",
            }}
          />
        ) : (
          <Avatar
            size="xl"
            bg="blue.500"
            source={{
              uri: connectedUser?.profileImage,
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
                  size: "xs",
                }}
                onPress={handleProfileImagePress}
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
        // flexGrow={1}
        h={"full"}
        w={"full"}
<<<<<<< HEAD
        // mb={10}
=======
        // mb={"10%"}
>>>>>>> 9a09f9e ([FEATURE] - implement image picker (gallery or camera) to change profile picture)
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <Box mt={4}>
          <Heading mx={4} color={"black"} size="md">
            Contact
          </Heading>
          <Box h={"full"} justifyContent={"space-between"}>
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

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          bgColor={"white"}
          w={"4/6"}
          mx={"auto"}
          borderBottomRadius={"lg"}
          borderTopRadius={"lg"}
          mb={4}
        >
          <Text my={2} color={"black"}>
            Choisir une image
          </Text>
          <Divider bgColor={"gray.100"} h={0.5} mt={2} />
          <Actionsheet.Item onPress={pickImage} bgColor={"white"} p={2}>
            <HStack ml={"5"}>
              <FontAwesome6
                name={"image"}
                size={18}
                color={MA_REUSSITE_CUSTOM_COLORS.Secondary}
              />
              <Text ml={4} color={MA_REUSSITE_CUSTOM_COLORS.Secondary}>
                Album photos
              </Text>
            </HStack>
          </Actionsheet.Item>
          <Divider bgColor={"gray.100"} h={0.5} />
          <Actionsheet.Item onPress={takePhoto} bgColor={"white"} p={2}>
            <HStack ml={"5"}>
              <FontAwesome5
                name={"camera"}
                size={18}
                color={MA_REUSSITE_CUSTOM_COLORS.Secondary}
              />
              <Text ml={"8"} color={MA_REUSSITE_CUSTOM_COLORS.Secondary}>
                Caméra
              </Text>
            </HStack>
          </Actionsheet.Item>
        </Actionsheet.Content>
        <Button mb={6} w={"4/6"} onPress={onClose} bgColor={"white"}>
          <Text color={MA_REUSSITE_CUSTOM_COLORS.Secondary}>Annuler</Text>
        </Button>
      </Actionsheet>
    </Box>
  );
};

export default ProfileScreen;
