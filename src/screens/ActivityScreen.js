import { Box, Text } from "native-base";
import React from "react";
import { BackgroundWrapper } from "../components";
import { useNavigation } from "@react-navigation/native";

const ActivityScreen = () => {
  const navigation = useNavigation();
  return (
    <Box flex={1} bg={"white"}>
      <BackgroundWrapper navigation={navigation}>
        <Box minH={"80%"} justifyContent={"center"} alignItems={"center"}>
          <Text color={"black"}>Welcome to Activity Screen</Text>
        </Box>
      </BackgroundWrapper>
    </Box>
  );
};

export default ActivityScreen;
