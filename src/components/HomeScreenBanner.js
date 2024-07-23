import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Avatar,
  Box,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { jsonrpcRequest } from "../api/apiClient";
import config from "../api/config";

function HomeScreenBanner({ user, selectedChild, listOfChildren }) {
  const route = useRoute();
  const navigation = useNavigation();
  const [sessionId, setSessionId] = useState(null);
  const [password, setPassword] = useState(null);
  const [partnerid, setPartnerid] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatarUri, setAvatarUri] = useState(null);
  const [account, setAccount] = useState();

  useEffect(() => {
    const { sessionId, email, password, partnerid } = route?.params || {};
    if (sessionId && password && partnerid) {
      setSessionId(sessionId);
      setPassword(password);
      setPartnerid(partnerid[0]);
    }
  }, [route]);

  useMemo(async () => {
    const cachedAvatar = await AsyncStorage.getItem("avatar_1024");
    if (cachedAvatar) {
      setAvatarUri(`data:image/png;base64,${cachedAvatar}`);
    }
    setLoading(false);
  }, [sessionId, partnerid]);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const userData = await jsonrpcRequest(
          sessionId,
          config.password,
          config.model.opStudent,
          [[["partner_id", "=", partnerid]]],
          ["avatar_1024"]
        );

        if (userData.length > 0 && userData[0].avatar_1024) {
          const { avatar_1024 } = userData[0];
          const base64Image = avatar_1024;
          const newAvatarUri = `data:image/png;base64,${base64Image}`;

          if (newAvatarUri !== avatarUri) {
            setAvatarUri(newAvatarUri);
            await AsyncStorage.setItem("avatar_1024", base64Image);
          }
        } else {
          await AsyncStorage.removeItem("avatar_1024");
          console.log("No avatar found for the user.");
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    if (sessionId && password && partnerid) {
      fetchProfileImage();
    }
  }, [sessionId, password, partnerid, avatarUri]);

  const goToProfile = () => {
    navigation.navigate("Profile", {
      sessionId: sessionId,
      password: password,
      partnerid: partnerid,
      selectedChild: selectedChild,
      listOfChildren: listOfChildren,
      user: user,
    });
  };
  useEffect(() => {
    if (selectedChild) {
      // console.log("selectedChild...", selectedChild);
      // console.log("listOfChildren...", listOfChildren);
      setAccount(
        <Text color={"black"}>Compte de {selectedChild.partner_id[1]}</Text>
      );
    }
  }, [selectedChild]);

  return (
    <Box bg="white">
      <VStack>
        <HStack>
          <Image
            size="sm"
            w={"70%"}
            ml={2}
            source={require("../../assets/images/ma_reussite_other_screens.png")}
            alt="Alternate Text"
          />
          <Pressable m={"auto"} onPress={goToProfile}>
            {loading ? (
              <Avatar
                size="md"
                source={{ uri: "https://placehold.co/400x400.png" }}
                onError={(e) => {
                  console.error("Error displaying image:", e.nativeEvent.error);
                }}
              />
            ) : (
              <Avatar
                size="md"
                source={{ uri: avatarUri }}
                onError={(e) => {
                  console.error("Error displaying image:", e.nativeEvent.error);
                }}
              />
            )}
          </Pressable>
        </HStack>
        <Box ml={8}>{account && account}</Box>
      </VStack>
    </Box>
  );
}

export default HomeScreenBanner;
