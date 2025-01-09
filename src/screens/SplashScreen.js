import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../http/config";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

import axios from "axios";
import { decode } from "../../http/password_encoding";

export default function SplashScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const showSplashScreen = async () => {
      //await new Promise((resolve) => setTimeout(resolve, 3000));

      try {
        const response = await axios.get(config.baseUrl + "/mobile/app/info");
        if ("error" in response.data) throw response.data.error;
        const PolicyIntegrityKey = response.data.privacy.sha256;

        // Retrieve stored policy agreement key
        const AgreedPrivacyPolicyIntegrityKey = await AsyncStorage.getItem(
          "AgreedPrivacyPolicyIntegrityKey"
        );

        // Retrieve token and expiration from storage
        const token = await AsyncStorage.getItem("erp_token");
        const tokenExpiration = await AsyncStorage.getItem(
          "erp_token_expiration"
        );
        const user_id = await AsyncStorage.getItem("user_id");

        // Check token validity
        const isTokenValid =
          token &&
          tokenExpiration &&
          new Date().getTime() / 1000 < parseInt(tokenExpiration, 10);

        if (user_id) {
          config.uid = parseInt(user_id);
          config.pwd = decode(await AsyncStorage.getItem("password"));
        }

        if (AgreedPrivacyPolicyIntegrityKey === PolicyIntegrityKey) {
          if (isTokenValid) {
            navigation.navigate("DrawerNavigator");
          } else {
            navigation.navigate("Login");
          }
        } else {
          navigation.navigate("Policy", {
            PolicyIntegrityKey,
            skipLogin: user_id,
          });
        }
      } catch (error) {
        console.error("Error during splash screen navigation:", error);
        navigation.navigate("Login");
      }
    };

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      showSplashScreen();
    });
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../../assets/images/ma_reussite_login_screen.png")}
        style={[
          styles.logo,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
  },
  logo: {
    width: 200,
    height: 200,
  },
});
