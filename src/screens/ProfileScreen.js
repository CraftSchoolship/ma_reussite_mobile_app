import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import {
  Actionsheet,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Text,
  useDisclose,
  useToast,
} from "native-base";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native"; // Ajoute cette ligne pour utiliser Alert de React Native
import { getObject, storeObject, updateRecord } from "../api/apiClient"; // Import updateRecord
import config from "../api/config";
import { ProfileUserEdit, ProfileUserInfo, ToastAlert } from "../components";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const ProfileScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [connectedUser, setConnectedUser] = useState({
    sessionId: "",
    email: "",
    password: "",
    userid: "",
    role: "",
    profileImage: null,
    name: "",
    phone: "",
    street: "",
  });
  const [loading, setLoading] = useState(true);
  const [isProfileEdit, setIsProfileEdit] = useState(false);

  useEffect(() => {
    if (route?.params?.edit) setIsProfileEdit(true);
  }, [route]);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getObject("connectedUser");
      console.log("User...", user.name);
      setConnectedUser(user);
      setLoading(false);
    };
    fetchUser();
  }, []);

  // Fonction pour mettre à jour la photo de profil dans Odoo
  const updateUserProfileImage = async (imageUri) => {
    try {
      // Lire l'image et la convertir en base64
      const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Mettre à jour l'utilisateur dans Odoo
      const response = await updateRecord(
        connectedUser.sessionId,
        connectedUser.password,
        config.model.partner, // Modèle Odoo
        connectedUser.userid[0], // ID de l'utilisateur
        {
          image_1920: imageBase64, // Champ pour l'image de profil dans Odoo (taille 1920px)
          // image_1024: imageBase64,
          // image_512: imageBase64,
          // image_256: imageBase64,
          // image_128: imageBase64,
        }
      );

      if (response) {
        toast.show({
          render: () => (
            <ToastAlert
              title={"Succès"}
              description={
                "Votre photo de profil a été mise à jour avec succès."
              }
              status={"success"}
              isClosable={true}
              variant={"left-accent"}
              duration={50000} // Durée en millisecondes
            />
          ),
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour de la photo de profil :",
        error
      );
      toast.show({
        title: "Erreur",
        description: "La mise à jour de la photo de profil a échoué.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleProfileImagePress = () => onOpen();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
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
      const imageUri = result.assets[0].uri;
      const updatedUser = { ...connectedUser, profileImage: imageUri };
      setConnectedUser(updatedUser);
      await storeObject("connectedUser", updatedUser);
      await updateUserProfileImage(imageUri);
    }
    onClose();
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
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
      const imageUri = result.assets[0].uri;
      const updatedUser = { ...connectedUser, profileImage: imageUri };
      setConnectedUser(updatedUser);
      await storeObject("connectedUser", updatedUser);
      await updateUserProfileImage(imageUri);
    }
    onClose();
  };

  return (
    <Box flex={1} bg="white">
      <Center mt={2}>
        {loading ? (
          <Avatar
            size="2xl"
            source={{ uri: "https://placehold.co/400x400.png" }}
          />
        ) : (
          <Avatar
            size="xl"
            source={{ uri: connectedUser?.profileImage }}
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
      <Divider bgColor={"gray.100"} h={"0.5"} mt={2} />
      {isProfileEdit ? (
        <ProfileUserEdit connectedUser={connectedUser} />
      ) : (
        <ProfileUserInfo connectedUser={connectedUser} />
      )}

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
