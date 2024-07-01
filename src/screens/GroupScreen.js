import { Box, HStack, Pressable, ScrollView, Text, VStack } from "native-base";
import React from "react";
import { ImageBackground } from "react-native";
import { HomeScreenBanner, CircularProgress } from "../components";

const groups = [
  { id: "1", name: "Big Data", progress: 90 },
  { id: "2", name: "AWS Cloud", progress: 50 },
  { id: "3", name: "Java Avancé", progress: 60 },
  { id: "4", name: "Machine Learning", progress: 80 },
  { id: "5", name: "Springboot", progress: 70 },
];

const GroupScreen = ({ navigation }) => {
  return (
    <Box flex={1} bg={"white"}>
      <HomeScreenBanner navigation={navigation} />
      <ImageBackground
        style={{ resizeMode: "contain", minHeight: "100%" }}
        source={require("../../assets/images/ma_reussite_background.png")}
      >
        <Box pt={4} w={"100%"}>
          <Text
            color={"black"}
            textAlign={"center"}
            fontWeight="bold"
            fontSize="lg"
          >
            Master 1 DevOps
          </Text>
        </Box>

        <ScrollView
          h={"80%"}
          p={2}
          flexGrow={1}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          <VStack w={"100%"} mb={"20%"}>
            {groups.map((group, index) => (
              <Pressable
                shadow={"9"}
                key={index}
                onPress={() => {
                  navigation.navigate("Sessions", {
                    groupName: group.name,
                  });
                }}
              >
                <Box
                  bg="white"
                  p={4}
                  mx={2}
                  my={2}
                  rounded="lg"
                  shadow={2}
                  justifyContent="center"
                  height="100"
                >
                  <HStack alignItems="center">
                    <CircularProgress progress={group.progress} />
                    <Box flex={1} mr={5} alignItems="center">
                      <Text color={"black"} fontWeight="bold" fontSize="lg">
                        {group.name}
                      </Text>
                    </Box>
                  </HStack>
                </Box>
              </Pressable>
            ))}
          </VStack>
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

export default GroupScreen;
