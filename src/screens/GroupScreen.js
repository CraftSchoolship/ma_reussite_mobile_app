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
import { getUserInfo } from "../utils/authLogic";

const GroupScreen = ({ navigation }) => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      try {
        const user = await getUserInfo();

        if (!user )
          return;

        const role = user.craft_role;

        const lines = await browse(
          "craft.group.student.line",
          ["class_id"],
          {
            student_id: user.craft_student_id[0],
          }
        );

        const groupsData = await browse(
          "craft.class",
          [
            "name",
            "student_ids",
            "level_id",
            "hourly_volume_progress",
            "subject_id",
          ],
          { id_in : lines.map((line) => line.class_id[0]).join(",") }
        );
        setGroups(groupsData);

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
        {
          class_id: group.id,
        }
      );
      console.log("Students:", students);

      const studentNames = students.map((student) => student.student_id[1]);

      navigation.navigate("Session", {
        groupName: group.name,
        students: studentNames,
        subjectId: group.subject_id[0],
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
            {groups.length > 0 ? groups[0].level_id[1] : "Pas de niveau"}
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
                          progress={group.hourly_volume_progress}
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
