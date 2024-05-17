import { View, Text } from "react-native";
import React from "react";
import { Button } from "native-base";
import { AuthRoute } from "../navigation/auth.routes";

const Register = ({ navigation }: any) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Register</Text>
      <Button
        variant={"outline"}
        size={"lg"}
        onPress={() => navigation.navigate(AuthRoute.LOGIN)}
      >
        Login Page
      </Button>
    </View>
  );
};

export default Register;
