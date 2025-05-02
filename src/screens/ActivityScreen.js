import {
  Box,
  Text,
  VStack,
  Center,
  ScrollView,
} from "native-base";
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { useThemeContext } from "../hooks/ThemeContext";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useNotification } from "../hooks/NotificationContext";

const NotificationScreen = () => {
  const { isDarkMode } = useThemeContext();
  const { notifications } = useNotification();

  const renderItem = ({ item }) => {
    const date = new Date(item.timestamp).toLocaleString("en-GB");
    return (
      <View
        style={[
          styles.itemContainer,
          {
            backgroundColor: isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black: MA_REUSSITE_CUSTOM_COLORS.White,
          },
        ]}
      >
        <Text
          style={[
            styles.title,
            { color: isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White },
          ]}
        >
          {item.title}
        </Text>
        <Text style={[styles.body, { color: isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White }]}>
          {item.body}
        </Text>
        <Text style={[styles.date, { color: isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White }]}>
          {date}
        </Text>
      </View>
    );
  };

  return (
    <BackgroundWrapper navigation={navigation}>
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
            color={isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White}
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
            color={isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White}
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
          style={{ backgroundColor: isDarkMode ? MA_REUSSITE_CUSTOM_COLORS.Black : MA_REUSSITE_CUSTOM_COLORS.White, flex: 1 }}
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
