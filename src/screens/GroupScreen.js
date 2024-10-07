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
import { getObject, jsonrpcRequest } from "../api/apiClient";
import config from "../api/config";
import { BackgroundWrapper, CircularProgress } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const GroupScreen = ({ navigation }) => {
  const route = useRoute();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useThemeContext();
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getObject("connectedUser");
      setConnectedUser(user);
      setLoading(false);
    };
    fetchUser();
  }, [route]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const groupsData = await await jsonrpcRequest(
          connectedUser.uid,
          connectedUser.password,
          config.model.groups,
          []
        );

        setGroups(groupsData);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    if (connectedUser?.role) fetchGroups();
  }, [connectedUser]);

  return (
    <Box flex={1} bg={"white"}>
      <BackgroundWrapper navigation={navigation}>
        <Box pt={4} w={"100%"}>
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
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
              {groups?.length > 0 ? (
                groups?.map((group, index) => (
                  <Pressable
                    shadow={"9"}
                    key={index}
                    onPress={() => {
                      navigation.navigate("Session", {
                        groupName: group.name,
                      });
                    }}
                  >
                    <Box
                      p={4}
                      mx={2}
                      my={2}
                      rounded="lg"
                      shadow={2}
                      justifyContent="center"
                      height="100"
                      bg={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.Black
                          : MA_REUSSITE_CUSTOM_COLORS.White
                      }
                    >
                      <HStack alignItems="center">
                        <CircularProgress
                          isDarkMode={isDarkMode}
                          progress={group.progress}
                        />
                        <Box flex={1} mr={5} alignItems="center">
                          <Text
                            color={
                              isDarkMode
                                ? MA_REUSSITE_CUSTOM_COLORS.White
                                : MA_REUSSITE_CUSTOM_COLORS.Black
                            }
                            fontWeight="bold"
                            fontSize="lg"
                          >
                            {group.name}
                          </Text>
                        </Box>
                      </HStack>
                    </Box>
                  </Pressable>
                ))
              ) : (
                <Box>
                  <Text
                    mt={"30%"}
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                    textAlign={"center"}
                    fontSize={"2xl"}
                    fontWeight={"bold"}
                  >
                    Pas de groupe
                  </Text>
                </Box>
              )}
            </VStack>
          </ScrollView>
        )}
      </BackgroundWrapper>
    </Box>
  );
};

export default GroupScreen;

/* -------------------------------------------------------------------------- */
/*                                  VERSION_1                                 */
/* -------------------------------------------------------------------------- */

// import { Box, Center, Image } from "native-base";
// import React from "react";
// import { BackgroundWrapper } from "../../components";

// const GroupScreen = ({ navigation }) => {
//   return (
//     <Box flex={1} bg="white">
//       <BackgroundWrapper navigation={navigation}>
//         <Center
//           minH={"80%"}
//           //  bgColor={"amber.400"}
//         >
//           <Image
//             // bgColor={"blue.300"}
//             size="sm"
//             w={"90%"}
//             resizeMode="contain"
//             minH={"70%"}
//             p={2}
//             // m={"auto"}
//             source={require("../../assets/images/coming_soon.png")}
//             alt="Alternate Text"
//           />
//         </Center>
//       </BackgroundWrapper>
//     </Box>
//   );
// };

// export default GroupScreen;