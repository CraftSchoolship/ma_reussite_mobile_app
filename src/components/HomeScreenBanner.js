import React from "react";
import { Avatar, Box, HStack, Image } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function HomeScreenBanner({ navigation }) {
  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <Box bg="white" mt={"5%"}>
      <HStack pt={10} pb={5}>
        <Image
          size="sm"
          w={"70%"}
          ml={2}
          source={require("../../assets/images/ma_reussite_other_screens.png")}
          alt="Alternate Text"
        />
        <Avatar
          m={"auto"}
          mr={5}
          bg="orange.500"
          size="sm"
          // size="2xl"
          // source={{
          //   uri: "https://via.placeholder.com/150",
          // }}
        >
          <MaterialIcons
            onPress={goToProfile}
            name="person"
            color="white"
            size={24}
          />
        </Avatar>
      </HStack>
    </Box>
  );
}

export default HomeScreenBanner;
