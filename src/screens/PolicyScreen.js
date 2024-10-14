import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { Button, Text } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RenderHtml from "react-native-render-html";
import config from "../../http/config";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PolicyScreen = ({ route, navigation }) => {
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentWidth = Dimensions.get("window").width;
  const { PolicyIntegrityKey, skipLogin } = route.params;

  const insets = useSafeAreaInsets(); // Get the safe area insets

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      const response = await fetch(config.baseUrl + "/privacy/raw");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const policyText = await response.text();
      setPolicy(policyText);
    } catch (error) {
      console.error("Error fetching policy:", error);
    } finally {
      setLoading(false);
    }
  };

  const agreePolicy = async () => {
    try {
      await AsyncStorage.setItem(
        "AgreedPrivacyPolicyIntegrityKey",
        PolicyIntegrityKey
      );
      // const storedPolicy = await AsyncStorage.getItem(
      //   "AgreedPrivacyPolicyIntegrityKey"
      // );
      // console.log("Stored Policy Agreement:", storedPolicy);

      if (skipLogin) {
        navigation.navigate("DrawerNavigator");
      } else {
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error saving policy agreement:", error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {policy ? (
          <RenderHtml contentWidth={contentWidth} source={{ html: policy }} />
        ) : (
          <View>
            <Text>Failed to load policy.</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          onPress={agreePolicy}
          isDisabled={!policy}
          style={{ height: 48, borderRadius: 12, width: "100%" }}
          bg={MA_REUSSITE_CUSTOM_COLORS.Primary}>
          <Text style={styles.buttonText}>J'accepte</Text>
        </Button>
        {/* <TouchableOpacity style={styles.button} onPress={agreePolicy}>
          <Text style={styles.buttonText}>J'accepte</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  scrollView: {
    padding: 10,
  },
  buttonContainer: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  button: {
    width: "70%",
    height: 48,
    backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PolicyScreen;
