import { Actionsheet, Box, Button, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import React from "react";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { MaterialIcons } from "@expo/vector-icons";

export const EventsActionSheet = ({ isDarkMode, user, selectedEvent, isOpen, onClose, navigation,}) => {

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.BackgroundDark
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
      >
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text
            textAlign={"center"}
            color={isDarkMode ? "white" : "black"}
            fontSize="lg"
            fontWeight="bold"
          >
            Événements
          </Text>
        </Box>
        <ScrollView
          w="100%"
          flexGrow={1}
          mx={"auto"}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <VStack space={4} px={4}>
            <Box
              borderRadius={10}
              borderWidth={0.5}
              borderColor={
                isDarkMode
                  ? MA_REUSSITE_CUSTOM_COLORS.Black
                  : MA_REUSSITE_CUSTOM_COLORS.LightBorderCalendarCard
              }
              overflow={"hidden"}
              mb={4}
            >
              <HStack
                justifyContent="space-between"
                alignItems="center"
                bg={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.Black
                    : MA_REUSSITE_CUSTOM_COLORS.LightBgCalendarCard
                }
                p={4}
              >
                <VStack w={"full"}>
                  <HStack>
                    <Icon
                      as={MaterialIcons}
                      name="trip-origin"
                      color={"primary.500"}
                      size={4}
                      alignSelf={"center"}
                      mr={0.5}
                    />
                    <Text
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      }
                      fontSize={"lg"}
                    >
                      {selectedEvent.date} à {selectedEvent.time}
                    </Text>
                  </HStack>
                  <HStack my={1}>
                    <Text
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      }
                      fontSize={"xl"}
                      textTransform={"capitalize"}
                      fontWeight={"bold"}
                    >
                      {`Cours : ${selectedEvent.subject}`}
                    </Text>
                  </HStack>
                  <HStack my={2}>
                    <Text
                      color={
                        isDarkMode
                          ? MA_REUSSITE_CUSTOM_COLORS.White
                          : MA_REUSSITE_CUSTOM_COLORS.Black
                      }
                      fontSize={"lg"}
                      textTransform={"capitalize"}
                    >{`Prof : ${selectedEvent.teacher}`}</Text>
                  </HStack>
                  <Text
                    color={
                      isDarkMode
                        ? MA_REUSSITE_CUSTOM_COLORS.White
                        : MA_REUSSITE_CUSTOM_COLORS.Black
                    }
                    fontSize={"lg"}
                    textTransform={"capitalize"}
                  >
                    {`Salle : ${selectedEvent.classroom}`}
                  </Text>
                  {user?.craft_role == "admin" ||
                  user?.craft_role == "teacher" ||
                  user?.craft_role == "staff" ? (
                    <Button
                      mt={8}
                      mb={2}
                      w={"full"}
                      fontSize={"lg"}
                      onPress={() => {
                        onClose();
                        navigation.navigate("AttendanceStaff", {session: selectedEvent._raw});
                      }}
                    >
                      Présence
                    </Button>
                  ) : null}
                </VStack>
              </HStack>
            </Box>
          </VStack>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
