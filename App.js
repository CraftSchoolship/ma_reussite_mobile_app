import React, { useEffect, useState } from "react";
import { Button, NativeBaseProvider } from "native-base";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import useFonts from "./src/hooks/useFonts";
import { AppNavigator } from "./src/navigation/AppNavigator";
import customTheme from "./src/themes/customTheme";
import KeyboardDismissWrapper from "./src/hooks/useKeyboard";

// import { SelectedChildProvider } from "./src/hooks/SelectedChildContext";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [currentPolicyVersion, setCurrentPolicyVersion] = useState(null);

  const handleWebViewMessage = (event) => {
    const policyVersion = event.nativeEvent.data;
    console.log(policyVersion);

    setCurrentPolicyVersion(policyVersion);
  };

  const PrivacyPolicyScreen = ({ onAccept }) => {
    return (
      <NativeBaseProvider isSSR theme={customTheme}>
        <WebView
          source={{
            uri: "https://ma-reussite-privacy.netlify.app",
          }}
          style={{ flex: 1, marginTop: "10%", marginBottom: "5%" }}
          onMessage={handleWebViewMessage}
        />
        <Button
          w={"70%"}
          mx={"auto"}
          mb={"2%"}
          onPress={onAccept}
          style={{ height: 50 }}
        >
          J'accepte
        </Button>
      </NativeBaseProvider>
    );
  };

  console.log("Loading fonts");

  const fontsLoaded = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Bold": require("./assets/fonts/Lato-Bold.ttf"),
  });

  console.log("Loaded fonts");

  const handleAccept = async () => {
    await AsyncStorage.setItem("policyAccepted", "true");
    await AsyncStorage.setItem("policyVersion", currentPolicyVersion);
    setPolicyAccepted(true);
    console.log("Accepted Policy");
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
    console.log("");

    return <PrivacyPolicyScreen onAccept={handleAccept} />;
  }

  return (
    <NativeBaseProvider isSSR theme={customTheme}>
      {/* <SelectedChildProvider> */}
      <KeyboardDismissWrapper>
        <AppNavigator />
      </KeyboardDismissWrapper>
      {/* </SelectedChildProvider> */}
    </NativeBaseProvider>
  );
};

export default App;
