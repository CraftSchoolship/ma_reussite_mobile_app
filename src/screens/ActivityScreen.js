import {
  Box,
  Text,
  VStack,
  Center,
  ScrollView,
} from "native-base";
import React from "react";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useNotification } from "../hooks/NotificationContext";
import { useNavigation } from "@react-navigation/native";

const NotificationScreen = () => {
  const { isDarkMode } = useThemeContext();
  const { notifications } = useNotification();
  const navigation = useNavigation();
  const NotificationNav = (data) => {
    console.log(data?.action)
    switch (data?.action) {
      case "open_class_detail":
        navigation.navigate("Groups")
        break;
      case "open_invoice_detail":
        navigation.navigate("Payment")
        break;
      case "open_grade_detail":
        navigation.navigate("Notes")
        break;
      // case "open_session_detail":
      //   navigation.navigate("Session")
      //   break;  
      default:
        break
    }

  }
  const renderItem = ({ item }) => {
    const date = new Date(item.timestamp).toLocaleString("en-GB");
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          {
            backgroundColor: isDarkMode ? "#2c2c2e" : "#f9f9f9",
          },
        ]}
        onPress={() => NotificationNav(item?.data)}>      
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? "#fff" : "#202244" },
          ]}
        >
          {item.title}
        </Text>
        <Text style={[styles.body, { color: isDarkMode ? "#aaa" : "#555" }]}>
          {item.body}
        </Text>
        <Text style={[styles.date, { color: isDarkMode ? "#999" : "#888" }]}>
          {date}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <BackgroundWrapper>
      <Box
        bg={
          isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.Black
            : MA_REUSSITE_CUSTOM_COLORS.White
        }
        py={2}
        shadow={4}
        borderBottomRadius="xl"
      >
        <Text
          color={
            isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.White
              : MA_REUSSITE_CUSTOM_COLORS.Black
          }
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          mb={2}
        >
          Notifications
        </Text>
      </Box>

      {notifications.length === 0 ? (
        <Center flex={1} px={6} py={10}>
          <Text
            fontSize="2xl"
            fontWeight="400"
            color={isDarkMode ? "#fff" : "#202244"}
            textAlign="center"
          >
            There is No{" "}
            <Text fontWeight="bold">
              Notification!
            </Text>
          </Text>
          <Text
            fontSize="md"
            fontWeight="400"
            color={isDarkMode ? "#ddd" : "#202244"}
            mt={4}
            textAlign="center"
          >
            No notifications for now
          </Text>
        </Center>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item, idx) => idx.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          style={{ backgroundColor: isDarkMode ? "#000" : "#fff", flex: 1 }}
        />
      )}
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 20,
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  body: {
    fontSize: 14,
    marginTop: 5,
  },
  date: {
    fontSize: 12,
    marginTop: 8,
    textAlign: "right",
  },
});

export default NotificationScreen;
