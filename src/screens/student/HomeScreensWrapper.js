import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, Text } from "native-base";
import HomeScreen from "./HomeScreen";

const HomeScreensWrapper = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [sessionId, setSessionId] = useState(null);
  const [password, setPassword] = useState(null);
  const [partnerid, setPartnerid] = useState(null);
  const [role, setRole] = useState("");
  const [wrapper, setWrapper] = useState(null);

  useEffect(() => {
    const { sessionId, email, password, partnerid, role } = route?.params;
    setSessionId(sessionId);
    setPassword(password);
    setPartnerid(partnerid[0]);
    setRole(role);
  }, [route]);

  useEffect(() => {
    setWrapper(
      role && role === "is_student" ? (
        <HomeScreen
          sessionId={sessionId}
          password={password}
          partnerid={partnerid}
        />
      ) : (
        <Text color={"black"}>Parent HomeScreen</Text>
      )
    );
  }, [role]);

  return <>{wrapper}</>;
};

export default HomeScreensWrapper;
