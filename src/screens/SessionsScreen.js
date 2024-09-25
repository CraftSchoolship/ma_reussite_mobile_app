import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { SafeAreaView } from "react-native";
import { BackgroundWrapper } from "../components";
import { TabMenuItem } from "../components/TabMenuItem";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const participants = [
  { id: "1", name: "Samir Tata (Enseignant)" },
  { id: "2", name: "Mohamed Mohamed" },
  { id: "3", name: "Khalil Galalem" },
  { id: "4", name: "Berthonge Christ" },
  { id: "5", name: "Nagil Glad" },
  { id: "6", name: "Rayen Dhmaied" },
  { id: "7", name: "Asad Babur" },
  { id: "8", name: "Wael Mbarek" },
  { id: "9", name: "Khadija Amri" },
];

const sessions = {
  past: [
    { id: "1", date: "14/06/2023", time: "10:00-12:00", attended: true },
    { id: "2", date: "21/06/2023", time: "10:00-12:00", attended: false },
  ],
  future: [
    { id: "3", date: "28/06/2024", time: "10:00-12:00", attended: false },
    { id: "4", date: "05/07/2024", time: "10:00-12:00", attended: false },
  ],
};

const SessionsScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("participants");
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollViewContentWidth, setScrollViewContentWidth] = useState(0);
  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const { isDarkMode } = useThemeContext();

  const renderParticipant = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("Sessions")}>
      <Box
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        p={4}
        borderTopColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
            : MA_REUSSITE_CUSTOM_COLORS.LightDivider
        }
        borderBottomColor={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.DarkDivider
            : MA_REUSSITE_CUSTOM_COLORS.LightDivider
        }
        shadow={1}
        borderBottomWidth={1}
        borderTopWidth={1}
      >
        <HStack alignItems={"center"}>
          <Avatar
            size="sm"
            mr={2}
            source={{
              uri: null,
            }}
            bgColor={MA_REUSSITE_CUSTOM_COLORS.Secondary}
          >
            <IconButton
              icon={
                <Icon
                  as={MaterialIcons}
                  name="person"
                  size="lg"
                  color="white"
                  mx={"auto"}
                />
              }
              borderRadius="full"
              _icon={{
                color: "white",
                size: "xs",
              }}
              _pressed={{
                bg: "primary.600:alpha.20",
              }}
            />
          </Avatar>
          <Text
            color={
              isDarkMode
                ? MA_REUSSITE_CUSTOM_COLORS.White
                : MA_REUSSITE_CUSTOM_COLORS.Black
            }
          >
            {item.name}
          </Text>
        </HStack>
      </Box>
    </Pressable>
  );

  const renderSession = ({ item }) => (
    <Box
      bg={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.LightBgCalendarCard
      }
      p={4}
      borderRadius={8}
      shadow={1}
      mb={4}
      borderColor={
        isDarkMode
          ? MA_REUSSITE_CUSTOM_COLORS.Black
          : MA_REUSSITE_CUSTOM_COLORS.LightBorderCalendarCard
      }
    >
      <HStack>
        <Box w={"4/6"}>
          <VStack>
            <HStack>
              <Text
                w={"1/4"}
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
              >
                Date:
              </Text>

              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
              >
                {item.date}
              </Text>
            </HStack>
            <HStack>
              <Text
                w={"1/4"}
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
              >
                Heure:
              </Text>
              <Text
                color={
                  isDarkMode
                    ? MA_REUSSITE_CUSTOM_COLORS.White
                    : MA_REUSSITE_CUSTOM_COLORS.Black
                }
              >
                {item.time}
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Box
          w={"2/6"}
          // bg={"amber.400"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text
            color={MA_REUSSITE_CUSTOM_COLORS.White}
            bg={
              item.attended
                ? // ? MA_REUSSITE_CUSTOM_COLORS.Black
                  "green.700"
                : MA_REUSSITE_CUSTOM_COLORS.Danger
            }
            px={4}
            py={1}
            borderRadius={"2xl"}
          >
            {item.attended ? "Présent" : "Absent"}
          </Text>
        </Box>
      </HStack>
    </Box>
  );

  const handleScrollLeft = () => {
    scrollViewRef.current.scrollTo({
      x: scrollPosition - 100,
      animated: true,
    });
  };

  const handleScrollRight = () => {
    scrollViewRef.current.scrollTo({
      x: scrollPosition + 100,
      animated: true,
    });
  };

  return (
    <SafeAreaView>
      <BackgroundWrapper navigation={navigation}>
        <VStack flex={1} p={4}>
          <HStack alignItems="center" mb={4}>
            {scrollPosition > 0 && (
              <Pressable onPress={handleScrollLeft}>
                <Icon
                  as={MaterialIcons}
                  name="chevron-left"
                  size="lg"
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                  mr={2}
                />
              </Pressable>
            )}
            <ScrollView
              horizontal={true}
              ref={scrollViewRef}
              showsHorizontalScrollIndicator={false}
              onScroll={(e) => setScrollPosition(e.nativeEvent.contentOffset.x)}
              onContentSizeChange={(contentWidth) =>
                setScrollViewContentWidth(contentWidth)
              }
              onLayout={(e) => setScrollViewWidth(e.nativeEvent.layout.width)}
              scrollEventThrottle={16}
            >
              <HStack space={4}>
                <TabMenuItem
                  title={"Participants"}
                  tabKey={"participants"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isDarkMode={isDarkMode}
                />
                <TabMenuItem
                  title={"Sessions Passées"}
                  tabKey={"past"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isDarkMode={isDarkMode}
                />
                <TabMenuItem
                  title={"Sessions Futures"}
                  tabKey={"future"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isDarkMode={isDarkMode}
                />
              </HStack>
            </ScrollView>
            {scrollPosition + scrollViewWidth < scrollViewContentWidth && (
              <Pressable onPress={handleScrollRight}>
                <Icon
                  as={MaterialIcons}
                  name="chevron-right"
                  size="lg"
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                  ml={2}
                />
              </Pressable>
            )}
          </HStack>
          {activeTab === "participants" ? (
            <FlatList
              data={participants}
              renderItem={renderParticipant}
              keyExtractor={(item) => item.id}
              scrollEnabled={true}
            />
          ) : (
            <FlatList
              data={sessions[activeTab]}
              renderItem={renderSession}
              keyExtractor={(item) => item.id}
              scrollEnabled={true}
            />
          )}
        </VStack>
      </BackgroundWrapper>
    </SafeAreaView>
  );
};

export default SessionsScreen;
