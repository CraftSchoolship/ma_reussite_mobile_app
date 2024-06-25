import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Icon,
  Center,
  Pressable,
  ScrollView,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground, TouchableOpacity } from "react-native";
import { HomeScreenBanner } from "../components/Banner";

const subjects = [
  { name: "Big Data" },
  { name: "AWS Cloud" },
  { name: "Java Avancé" },
  { name: "Machine Learning" },
  { name: "SpringBoot" },
  { name: "Python" },
  { name: "Sécurité" },
  { name: "Virtualisation" },
];

const SubjectsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("current");

  return (
    <Box flex={1} bg={"white"}>
      <HomeScreenBanner navigation={navigation} />
      <ImageBackground
        style={{ resizeMode: "contain" }}
        source={require("../../assets/images/ma_reussite_background.png")}
      >
        {/* Onglets */}
        <HStack justifyContent="center" mt={4} mb={2}>
          <Button
            onPress={() => setActiveTab("current")}
            variant={activeTab === "current" ? "solid" : "outline"}
            mx={1}
          >
            Liste des matières
          </Button>
          <Button
            onPress={() => setActiveTab("past")}
            variant={activeTab === "past" ? "solid" : "outline"}
            mx={1}
          >
            Sessions Passées
          </Button>
          <Button
            onPress={() => setActiveTab("future")}
            variant={activeTab === "future" ? "solid" : "outline"}
            mx={1}
          >
            Sessions Futures
          </Button>
        </HStack>

        {/* Contenu */}
        <ScrollView h={600} p={4}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            flexDir={"row"}
            flexWrap={"wrap"}
            space={4}
            w={"100%"}
          >
            {subjects.map((subject, index) => (
              <Pressable
                shadow={"9"}
                mb={5}
                width="48%"
                key={index}
                onPress={() => {}}
              >
                <Box
                  bg="white"
                  p={4}
                  rounded="lg"
                  shadow={2}
                  mb={2}
                  justifyContent="center"
                  alignItems="center"
                  height="100"
                >
                  <Text
                    color={"black"}
                    fontWeight="bold"
                    fontSize="lg"
                    textAlign="center"
                  >
                    {subject.name}
                  </Text>
                </Box>
              </Pressable>
            ))}
          </Box>
        </ScrollView>
      </ImageBackground>
    </Box>
  );
};

export default SubjectsScreen;
