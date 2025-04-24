import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
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
import { Alert } from "react-native";
import { update } from "../../http/http";
import { ProfileUserEdit } from "../components/ProfileUserEdit";
import { ProfileUserInfo } from "../components/ProfileUserInfo";
import ToastAlert from "../components/ToastAlert";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { getUserInfo } from "../utils/AuthService";

const ProfileScreen = () => {
  const route = useRoute();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclose();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const { isDarkMode } = useThemeContext();

  const fetchUser = async () => {
    setLoading(true);
    setUser(await getUserInfo());
    setLoading(false);
  };

  useEffect(() => {
    route?.params?.edit ? setIsProfileEdit(true) : setIsProfileEdit(false);
  }, [route]);

  useEffect(() => {
    fetchUser();
  }, []);

  const updateUserProfileImage = async (imageUri) => {
    try {
      const response = await update("res.users", user.id, {
        image_1920: await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        })
      });

      await fetchUser();

      if (response) {
        toast.show({
          render: () => (
            <ToastAlert
              title={"Succès"}
              description={"Votre photo de profil a été mise à jour avec succès."}
              status={"success"}
              isClosable={true}
              variant={"left-accent"}
              duration={3000}
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
      await updateUserProfileImage(result.assets[0].uri);
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
      await updateUserProfileImage(result.assets[0].uri);
    }
    onClose();
  };

  return (
    <Box flex={1} py={4}>
      <Center my={2}>
        {loading ? (
          <Avatar
            size="xl"
            source={{ uri: "https://placehold.co/400x400.png" }}
          />
        ) : (
          <Avatar
            size="xl"
            source={{ uri: user?.avatar }}
            bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
          >
            <Avatar.Badge
              bg={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.Black
                  : MA_REUSSITE_CUSTOM_COLORS.White
              }
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
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                    position="absolute"
                    top={0.5}
                    left={0.5}
                  />
                }
                borderRadius="full"
                _icon={{
                  size: "xs",
                }}
                onPress={() => onOpen()}
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
        <Heading
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
          mt={2}
        >
          {user?.name}
        </Heading>
      </Center>
      <Divider
        bgColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
            : MA_REUSSITE_CUSTOM_COLORS.LightDivider
        }
        h={"0.5"}
        mt={2}
      />

      {isProfileEdit ? (<ProfileUserEdit />) : (<ProfileUserInfo />)}

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content
          bgColor={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.DarkActionSheet
              : MA_REUSSITE_CUSTOM_COLORS.White
          }
          w={"4/6"}
          mx={"auto"}
          borderBottomRadius={"lg"}
          borderTopRadius={"lg"}
          mb={4}
        >
          <Text
            my={2}
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
          >
            Choisir une image
          </Text>
          <Divider
            bgColor={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.Black
                : MA_REUSSITE_CUSTOM_COLORS.LightDivider
            }
            h={0.5}
            mt={2}
          />
          <Actionsheet.Item
            onPress={pickImage}
            bgColor={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.DarkActionSheet
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
            p={2}
          >
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
          <Divider
            bgColor={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.Black
                : MA_REUSSITE_CUSTOM_COLORS.LightDivider
            }
            h={0.5}
          />
          <Actionsheet.Item
            onPress={takePhoto}
            bgColor={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.DarkActionSheet
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
            p={2}
          >
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
        <Button
          mb={6}
          w={"4/6"}
          onPress={onClose}
          bgColor={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.DarkActionSheet
              : MA_REUSSITE_CUSTOM_COLORS.White
          }
        >
          <Text color={MA_REUSSITE_CUSTOM_COLORS.Secondary}>Annuler</Text>
        </Button>
      </Actionsheet>
    </Box>
  );
};

export default ProfileScreen;
