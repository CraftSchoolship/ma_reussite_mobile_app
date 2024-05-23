import React from "react";
import { NativeBaseProvider } from "native-base";
import AppNavigator from "./src/navigation/AppNavigator";
import customTheme from "./src/theme/themes/customTheme";

const App: React.FC = () => {
  return (
    <NativeBaseProvider theme={customTheme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

export default App;
