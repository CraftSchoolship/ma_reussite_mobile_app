import {
  Box,
  Text,
  Center,
  ScrollView,
} from "native-base";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../utils/AuthContext";

const NotificationScreen = () => {
  const { isDarkMode } = useThemeContext();
  const navigation = useAuth();
  const [notifications, setNotifications]= useState([]);

 useEffect(() => {
  const LoadNotification = async () => {
    try {
      setNotifications(JSON.parse((await AsyncStorage.getItem('notifications')) ?? '[]'));
    } catch (error) {
      console.log(error)
    }
  }
  LoadNotification()
  }, []);

  const NotificationNavigation = (data) => {
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

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {notifications.length > 0 ? (
          notifications.map((notif, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.itemContainer,
                { backgroundColor: isDarkMode ? "#2c2c2e" : "#f9f9f9" },
              ]}
              onPress={() => NotificationNavigation(notif?.data)}
            >
              <Text style={[styles.title, { color: isDarkMode ? "#fff" : "#202244" }]}>{notif.title}</Text>
              <Text style={[styles.body, { color: isDarkMode ? "#aaa" : "#555" }]}>{notif.body}</Text>
              <Text style={[styles.date, { color: isDarkMode ? "#999" : "#888" }]}>{new Date(notif.timestamp).toLocaleString("en-GB")}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Center py={10}>
            <Text fontSize="2xl" fontWeight="400" color={isDarkMode ? "#fff" : "#202244"} textAlign="center">
              Il n’y a aucune {" "}
              <Text fontWeight="bold">notification!</Text>
            </Text>
            <Text fontSize="md" fontWeight="400" color={isDarkMode ? "#ddd" : "#202244"} mt={4} textAlign="center">
              Pas de notifications pour le moment
            </Text>
          </Center>
        )}
      </ScrollView>
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
