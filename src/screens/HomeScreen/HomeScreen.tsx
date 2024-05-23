import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Center } from "native-base";
import React from "react";
import { Text } from "react-native";
import Button from "../../components/Button";

type HomeScreenNavigationProp = StackNavigationProp<any, "Details">;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <Center flex={1}>
      <Text>Home Screen</Text>
      <Button onPress={() => navigation.navigate("Details")}>
        Go to Details
      </Button>
    </Center>
  );
};

export default HomeScreen;
