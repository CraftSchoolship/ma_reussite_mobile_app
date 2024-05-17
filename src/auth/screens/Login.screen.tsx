import { View, Text } from "react-native";
import React from "react";
import { Button } from "native-base";
import { AuthRoute } from "../navigation/auth.routes";

const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>LoginScreen</Text>
      <Button
        variant={"outline"}
        size={"lg"}
        onPress={() => navigation.navigate(AuthRoute.REGISTER)}
      >
        Register
      </Button>
    </View>
  );
};

export default LoginScreen;
