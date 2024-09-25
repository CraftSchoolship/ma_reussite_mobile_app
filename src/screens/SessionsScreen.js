import React, { useState, useRef } from "react";
import {
  Box,
  Text,
  FlatList,
  Pressable,
  VStack,
  HStack,
  ScrollView,
  Icon,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { TabMenuItem } from "../components/TabMenuItem";
import { BackgroundWrapper } from "../components";
import { SafeAreaView } from "react-native";

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

  const renderParticipant = ({ item }) => (
    <Pressable onPress={() => navigation.navigate("Sessions")}>
      <Box
        bg="white"
        p={4}
        borderTopColor={MA_REUSSITE_CUSTOM_COLORS.LightDivider}
        borderBottomColor={MA_REUSSITE_CUSTOM_COLORS.LightDivider}
        shadow={1}
        borderBottomWidth={1}
        borderTopWidth={1}
      >
        <Text>{item.name}</Text>
      </Box>
    </Pressable>
  );

  const renderSession = ({ item }) => (
    <Box bg="white" p={4} borderRadius={8} shadow={1} mb={4}>
      <Text>{item.date}</Text>
      <Text>{item.time}</Text>
      <Text>{item.attended ? "Présent" : "Absent"}</Text>
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
        <VStack flex={1} p={4} bg="gray.100">
          <HStack alignItems="center" mb={4}>
            {scrollPosition > 0 && (
              <Pressable onPress={handleScrollLeft}>
                <Icon
                  as={MaterialIcons}
                  name="chevron-left"
                  size="lg"
                  color={MA_REUSSITE_CUSTOM_COLORS.Black}
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
                />
                <TabMenuItem
                  title={"Sessions Passées"}
                  tabKey={"past"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                <TabMenuItem
                  title={"Sessions Futures"}
                  tabKey={"future"}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </HStack>
            </ScrollView>
            {scrollPosition + scrollViewWidth < scrollViewContentWidth && (
              <Pressable onPress={handleScrollRight}>
                <Icon
                  as={MaterialIcons}
                  name="chevron-right"
                  size="lg"
                  color={MA_REUSSITE_CUSTOM_COLORS.Black}
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
