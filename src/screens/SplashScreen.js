import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import config from "../../http/config";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

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

        //Update the config
        let workspace = response.data.workspace;
        workspace.erp.database = atob(workspace.erp.database);
        config.workspace = workspace;
        config.privacy = response.data.privacy;
        // config.auth = response.data.auth;

        navigation.navigate("Policy");
      }

      catch (error) {
        console.error("Error during splash screen navigation:", error);
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
