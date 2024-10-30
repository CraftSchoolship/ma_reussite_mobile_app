/* -------------------------------------------------------------------------- */
/*                                  VERSION_1                                 */
/* -------------------------------------------------------------------------- */

import { useNavigation, useRoute } from "@react-navigation/native";
import {
  Box,
  Center,
  HStack,
  Spinner,
  Text,
  FlatList,
  Input,
  Icon,
  VStack,
} from "native-base";
import React, { useEffect, useState } from "react";
import { BackgroundWrapper, CircularProgress } from "../components";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { Ionicons } from "@expo/vector-icons";

const fakeNotesData = [/*
  {
    id: "1",
    evaluation: "Evaluation Big Data",
    score: 18,
    maxScore: 20,
    color: "green.500",
  },
  {
    id: "2",
    evaluation: "Evaluation AWS Cloud",
    score: 16,
    maxScore: 20,
    color: "green.400",
  },
  {
    id: "3",
    evaluation: "Evaluation Java Avancé",
    score: 5,
    maxScore: 20,
    color: "red.400",
  },
  {
    id: "4",
    evaluation: "Evaluation Machine Learning",
    score: 9,
    maxScore: 20,
    color: "orange.400",
  },
  {
    id: "5",
    evaluation: "Evaluation Spring Boot",
    score: 14,
    maxScore: 20,
    color: "green.400",
  },
  {
    id: "6",
    evaluation: "Evaluation SpringBoot",
    score: 14,
    maxScore: 20,
    color: "green.400",
  },
  {
    id: "7",
    evaluation: "Evaluation SB",
    score: 12,
    maxScore: 20,
    color: "green.400",
  },
  {
    id: "8",
    evaluation: "Evaluation Boot",
    score: 13,
    maxScore: 20,
    color: "green.400",
  },
  {
    id: "9",
    evaluation: "Evaluation Spring",
    score: 11,
    maxScore: 20,
    color: "green.400",
  },*/
];

const NoteScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [degrees, setDegrees] = useState("");
  const { isDarkMode } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(fakeNotesData);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(fakeNotesData);
    } else {
      const filtered = fakeNotesData.filter((item) =>
        item.evaluation.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  return (
    <BackgroundWrapper navigation={navigation}>
      {loading ? (
        <Center h={"70%"} w={"90%"} mx={"auto"}>
          <Spinner size="xl" />
        </Center>
      ) : (
        <VStack
          // background={"amber.300"}
          flex={0.8}
          borderTopWidth={1}
          borderColor={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.Black
              : MA_REUSSITE_CUSTOM_COLORS.LightDivider
          }
          space={4}
        >
          <VStack
            borderBottomRadius={"2xl"}
            shadow={1}
            bg={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.Black
                : MA_REUSSITE_CUSTOM_COLORS.White
            }
            p={4}
          >
            <HStack
              w={"full"}
              // bg={"amber.300"}
              space={2}
              alignItems="center"
              mb={4}
            >
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                fontSize={18}
                fontWeight={"bold"}
              >
                {degrees}
              </Text>

              <Input
                flex={0.9}
                ml={"auto"}
                placeholder="Filtrer les matières"
                placeholderTextColor={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                value={searchQuery}
                onChangeText={handleSearch}
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                borderColor={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                borderRadius="sm"
                h={10}
                bg={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.Black
                    : MA_REUSSITE_CUSTOM_COLORS.White
                }
                _focus={{
                  borderColor: isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black,
                  backgroundColor: isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.Black
                    : MA_REUSSITE_CUSTOM_COLORS.White,
                  color: isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black,
                  cursorColor: isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black,
                }}
                size={"lg"}
                selectionHandleColor={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
                InputRightElement={
                  <Icon
                    as={<Ionicons name="search" />}
                    size={5}
                    mr={2}
                    bg={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.Black
                        : MA_REUSSITE_CUSTOM_COLORS.White
                    }
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                  />
                }
              />
            </HStack>
            <Text
              color={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.White
                  : MA_REUSSITE_CUSTOM_COLORS.Black
              }
              fontSize={18}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              Notes de l'étudiant
            </Text>
          </VStack>
          {filteredData?.length ?
          (<FlatList
            flex={1}
            data={filteredData}
            // scrollEnabled={true}
            // contentContainerStyle={{ flexGrow: 1 }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Box
                borderRadius={10}
                shadow={2}
                p={4}
                my={2}
                mx={4}
                flexDirection="row"
                alignItems="center"
                bg={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.Black
                    : MA_REUSSITE_CUSTOM_COLORS.White
                }
              >
                <CircularProgress
                  isDarkMode={isDarkMode}
                  progress={item.score}
                  note={true}
                />
                <Box ml={4}>
                  <Text
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                    fontSize={16}
                    fontWeight={"bold"}
                  >
                    {item.evaluation}
                  </Text>
                </Box>
              </Box>
            )}/>) :
          (<Text
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
            Pas de notes
          </Text>)}
        </VStack>
      )}
    </BackgroundWrapper>
  );
};

export default NoteScreen;

/* -------------------------------------------------------------------------- */
/*                                  VERSION_2                                 */
/* -------------------------------------------------------------------------- */

// import { useNavigation } from "@react-navigation/native";
// import { Box, Center, Image } from "native-base";
// import React from "react";
// import { BackgroundWrapper } from "../components";

// const NoteScreen = () => {
//   const navigation = useNavigation();

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

// export default NoteScreen;
