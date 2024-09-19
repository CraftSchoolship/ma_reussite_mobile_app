import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { Button, NativeBaseProvider } from "native-base";
import React, { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { AppWithTheme } from "./src/components";
import MA_REUSSITE_CUSTOM_COLORS from "./src/themes/variables";
import { ThemeProvider, useFonts } from "./src/hooks";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [currentPolicyVersion, setCurrentPolicyVersion] = useState(null);

  const handleWebViewMessage = (event) => {
    const policyVersion = event.nativeEvent.data;
    setCurrentPolicyVersion(policyVersion);
  };

  const PrivacyPolicyScreen = ({ onAccept }) => {
    return (
      <NativeBaseProvider>
        <WebView
          source={{ uri: "https://ma-reussite-privacy.netlify.app/" }}
          style={{ flex: 1, marginTop: "10%", marginBottom: "5%" }}
          onMessage={handleWebViewMessage}
        />
        <Button
          w={"50%"}
          mx={"auto"}
          mb={"2%"}
          onPress={onAccept}
          bg={MA_REUSSITE_CUSTOM_COLORS.Primary}
        >
          J'accepte
        </Button>
      </NativeBaseProvider>
    );
  };

  const fontsLoaded = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  const handleAccept = async () => {
    await AsyncStorage.setItem("policyAccepted", "true");
    await AsyncStorage.setItem("policyVersion", currentPolicyVersion);
    setPolicyAccepted(true);
  };

  const checkPolicyAcceptance = async () => {
    const value = await AsyncStorage.getItem("policyAccepted");
    const storedPolicyVersion = await AsyncStorage.getItem("policyVersion");

    if (value === "true" && storedPolicyVersion === currentPolicyVersion) {
      setPolicyAccepted(true);
    }
  };

  useEffect(() => {
    if (currentPolicyVersion) checkPolicyAcceptance();
    if (fontsLoaded && currentPolicyVersion) SplashScreen.hideAsync();
  }, [fontsLoaded, currentPolicyVersion]);

  if (!fontsLoaded) {
    return null;
  }

  if (!policyAccepted) {
    return <PrivacyPolicyScreen onAccept={handleAccept} />;
  }

  return (
    <ThemeProvider>
      <AppWithTheme />
    </ThemeProvider>
  );
};

export default App;
