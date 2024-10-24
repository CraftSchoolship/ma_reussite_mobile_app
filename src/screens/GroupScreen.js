// import { useRoute } from "@react-navigation/native";
// import {
//   Box,
//   Center,
//   HStack,
//   Pressable,
//   ScrollView,
//   Spinner,
//   Text,
//   VStack,
// } from "native-base";
// import React, { useEffect, useState } from "react";
// import { BackgroundWrapper, CircularProgress } from "../components";
// import { useThemeContext } from "../hooks/ThemeContext";
// import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
// import { TouchableHighlight, TouchableOpacity } from "react-native";

// const mockGroups = [
//   {
//     name: "Big Data",
//     progress: 90,
//   },
//   {
//     name: "AWS Cloud",
//     progress: 50,
//   },
//   {
//     name: "Java Avancé",
//     progress: 30,
//   },
//   {
//     name: "Machine Learning",
//     progress: 80,
//   },
//   {
//     name: "SpringBoot",
//     progress: 90,
//   },
//   {
//     name: "SpringBoot",
//     progress: 90,
//   },
//   {
//     name: "SpringBoot",
//     progress: 90,
//   },
//   {
//     name: "SpringBoot",
//     progress: 90,
//   },
//   {
//     name: "SpringBoot",
//     progress: 90,
//   },
// ];

// const GroupScreen = ({ navigation }) => {
//   const route = useRoute();
//   const [groups, setGroups] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { isDarkMode } = useThemeContext();

//   useEffect(() => {
//     setTimeout(() => {
//       setGroups(mockGroups);
//       setLoading(false);
//     }, 1000);
//   }, []);

//   return (
//     <Box flex={1} bg={"white"}>
//       <BackgroundWrapper navigation={navigation}>
//         <Box pt={4} w={"100%"}>
//           <Text
//             color={
//               isDarkMode
//                 ? MA_REUSSITE_CUSTOM_COLORS.White
//                 : MA_REUSSITE_CUSTOM_COLORS.Black
//             }
//             textAlign={"center"}
//             fontWeight="bold"
//             fontSize="lg"
//           >
//             Master 1 DevOps
//           </Text>
//         </Box>
//         {loading ? (
//           <Center h={"70%"} w={"90%"} mx={"auto"}>
//             <Spinner size="xl" />
//           </Center>
//         ) : (
//           <ScrollView
//             h={"80%"}
//             p={2}
//             flexGrow={1}
//             contentContainerStyle={{ paddingBottom: 80 }}
//           >
//             <VStack w={"100%"} mb={"20%"}>
//               {groups?.length > 0 ? (
//                 groups?.map((group, index) => (
//                   <TouchableOpacity
//                     activeOpacity={1}
//                     shadow={"9"}
//                     key={index}
//                     onPress={() => {
//                       navigation.navigate("Session", {
//                         groupName: group.name,
//                       });
//                     }}
//                   >
//                     <Box
//                       p={4}
//                       mx={2}
//                       my={2}
//                       rounded="lg"
//                       shadow={2}
//                       justifyContent="center"
//                       height="100"
//                       bg={
//                         isDarkMode
//                           ? MA_REUSSITE_CUSTOM_COLORS.Black
//                           : MA_REUSSITE_CUSTOM_COLORS.White
//                       }
//                     >
//                       <HStack alignItems="center">
//                         <CircularProgress
//                           isDarkMode={isDarkMode}
//                           progress={group.progress}
//                         />
//                         <Box flex={1} mr={5} alignItems="center">
//                           <Text
//                             color={
//                               isDarkMode
//                                 ? MA_REUSSITE_CUSTOM_COLORS.White
//                                 : MA_REUSSITE_CUSTOM_COLORS.Black
//                             }
//                             fontWeight="bold"
//                             fontSize="lg"
//                           >
//                             {group.name}
//                           </Text>
//                         </Box>
//                       </HStack>
//                     </Box>
//                   </TouchableOpacity>
//                 ))
//               ) : (
//                 <Box>
//                   <Text
//                     mt={"30%"}
//                     color={
//                       isDarkMode
//                         ? MA_REUSSITE_CUSTOM_COLORS.White
//                         : MA_REUSSITE_CUSTOM_COLORS.Black
//                     }
//                     textAlign={"center"}
//                     fontSize={"2xl"}
//                     fontWeight={"bold"}
//                   >
//                     Pas de groupe
//                   </Text>
//                 </Box>
//               )}
//             </VStack>
//           </ScrollView>
//         )}
//       </BackgroundWrapper>
//     </Box>
//   );
// };

// export default GroupScreen;
import { useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { BackgroundWrapper, CircularProgress } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { TouchableOpacity } from "react-native";
import { browse } from "../../http/http";
import { getObject } from "../api/apiClient";

const GroupScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useThemeContext();

  // Fetch all groups (classes)
  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const userId = await getObject("user_id");
        if (userId) {
          const groupsData = await browse(
            "craft.class",
            ["name", "student_ids", "level_id"],
            []
          );

          const transformedGroups = groupsData.map((group) => ({
            id: group.id, // Add id for navigation
            name: group.name,
            level: group.level_id[1],
            students: group.student_ids,
            progress: Math.floor(Math.random() * 101),
          }));

          setGroups(transformedGroups);
        }
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Fetch students when a group is selected
  const handleGroupPress = async (group) => {
    try {
      const students = await browse(
        "craft.group.student.line",
        ["student_id"],
        [["class_id", "=", group.id]]
      );

      // Ensure students are passed as names to the next screen
      const studentNames = students.map((student) => student.student_id[1]);

      navigation.navigate("Session", {
        groupName: group.name,
        students: studentNames,
      });
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

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
            {groups.length > 0 ? groups[0].level : "Pas de niveau"}
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
              {groups.length > 0 ? (
                groups.map((group, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleGroupPress(group)}
                  >
                    <Box
                      p={4}
                      mx={2}
                      my={2}
                      rounded="lg"
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
                  </TouchableOpacity>
                ))
              ) : (
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
/*                                  VERSION_2                                 */
/* -------------------------------------------------------------------------- */

// import { Box, Center, Image } from "native-base";
// import React from "react";
// import { BackgroundWrapper } from "../components";

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
