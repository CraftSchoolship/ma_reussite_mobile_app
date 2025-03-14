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
import { browse } from "../../http/http";
import { getObject } from "../api/apiClient";

const NoteScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { isDarkMode } = useThemeContext();
  const [grades, setGrades] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredData(grades);
    } else {
      const filtered = grades.filter((item) =>
        item.subject_id[1].toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };
  useEffect(() => {
    const fetchGrades = async () => {
      setLoading(true);
      try {
        const userId = await getObject("connectedUser");
        if (userId) {
          const gradeData = await browse("craft.grade", [
            "id",
            "subject_id",
            "criteria_id",
            "value",
            "level_id",
            "class_id",
          ]);

          setGrades(gradeData);
          setFilteredData(gradeData); // Initialize filtered data
        }
      } catch (error) {
        console.error("Error fetching grades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

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
                {grades.length > 0 ? grades[0].class_id[1] : "Pas de niveau"}
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

          <FlatList
            flex={1}
            data={filteredData}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={
              <Center flex={1} mt={10}>
                <Text
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                  fontSize={16}
                  fontWeight={"bold"}
                >
                  Aucun résultat trouvé
                </Text>
              </Center>
            }
            renderItem={({ item }) => (
              <Box
                borderRadius={10}
                shadow={2}
                p={4}
                my={2}
                mx={4}
                bg={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.Black
                    : MA_REUSSITE_CUSTOM_COLORS.White
                }
              >
                <HStack alignItems="center">
                  <CircularProgress
                    progress={item.value}
                    note={true}
                    isDarkMode={isDarkMode}
                  />
                  <Box ml={4} flex={1}>
                    <Text
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      }
                      fontSize={16}
                      fontWeight={"bold"}
                    >
                      {item.subject_id[1]}
                    </Text>
                    <Text
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      }
                      fontSize={14}
                      ml={4}
                    >
                      {item.criteria_id[1]}
                    </Text>
                  </Box>
                </HStack>
              </Box>
            )}
          />
        </VStack>
      )}
    </BackgroundWrapper>
  );
};

export default NoteScreen;
