import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  FlatList,
  Text
} from "native-base";
import React, { useEffect, useState } from "react";
import { connectedUser } from "../../http/http";
import { getObject } from "../api/apiClient";
import { LoginScreenBanner } from "../components";
import { ChildItem } from "../components/ParentChildItem";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";


const ChildrenScreen = () => {
  const { isDarkMode } = useThemeContext();
  const [childrenList, setChildrenList] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    const fetchUserData = async () => {
      const { connectedUser } = route.params || {};

      try {
        if (connectedUser?.role === "parent") {
          const children = await getObject("children");
          if (children) setChildrenList(children);
        }
      } catch (error) {
        console.error("Error fetching connectedUser data:", error);
      }
    };

    if (childrenList?.length < 1) fetchUserData();
  }, [childrenList, route]);

  return (
    <Box
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.White
      }
      flex={1}
    >
      <LoginScreenBanner />
      <Text
        color={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.White
            : MA_REUSSITE_CUSTOM_COLORS.Black
        }
        fontWeight={"bold"}
        fontSize={"2xl"}
        textAlign={"center"}
        my={"1/6"}
      >
        Choisir le Compte
      </Text>
      <Box mx={"auto"} w={"4/6"} flex={1}>
        <FlatList
          data={childrenList}
          renderItem={({ item }) => (
            <ChildItem item={item} navigation={navigation} connectedUser={connectedUser} />
          )}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </Box>
  );
};

export default ChildrenScreen;
