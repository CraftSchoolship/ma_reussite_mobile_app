import AppNavigator from "_/navigations/app.main.navigation";
import customTheme from "_/themes/customTheme";
import { NativeBaseProvider } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider theme={customTheme}>
      <AppNavigator />
    </NativeBaseProvider>
  );
}
