import { useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { jsonrpcRequest } from "../api/apiClient";
import config from "../api/config";
import { BackgroundWrapper, CircularProgress } from "../components";

const GroupScreen = ({ navigation }) => {
  const route = useRoute();
  const [groups, setGroups] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { sessionId, email, password, studentId } = route?.params;
    setSessionId(sessionId);
    setStudentId(studentId[0]);
    setPassword(password);
  }, [route]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await await jsonrpcRequest(
          sessionId,
          password,
          config.model.groups
        );
        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId && password && studentId) {
      fetchGroups();
    }
  }, [sessionId, studentId, password]);

  return (
    <Box flex={1} bg={"white"}>
      <BackgroundWrapper navigation={navigation}>
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
        {loading ? (
          <Center h={"70%"} w={"90%"} mx={"auto"}>
            <Spinner size="xl" />
          </Center>
        ) : (
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
                  // onPress={() => {
                  //   navigation.navigate("Sessions", {
                  //     groupName: group.name,
                  //   });
                  // }}
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
        )}
      </BackgroundWrapper>
    </Box>
  );
};

export default GroupScreen;
