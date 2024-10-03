import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon, IconButton } from "native-base";
import React, { useEffect, useState } from "react";
import { getObject } from "../api/apiClient";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { useThemeContext } from "../hooks/ThemeContext";
import { ProfileScreen } from "../screens";
import SessionsScreen from "../screens/SessionsScreen";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { TabNavigator } from "./TabNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [connectedUser, setConnectedUser] = useState(null);
  const [childrenList, setChildrenList] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getObject("connectedUser");
        if (user) {
          setConnectedUser(user);

          if (user.role === "parent") {
            const children = await getObject("children");
            setChildrenList(children || []);

            const storedChild = await getObject("selectedChild");
            setSelectedChild(storedChild || {});
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (childrenList?.length < 1) fetchUserData();
  }, [childrenList]);
  if (!connectedUser) {
    return null;
  }

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        drawerStyle: {
          margin: 0,
          padding: 0,
          backgroundColor: isDarkMode ? "#000" : "#fff",
        },
        drawerType: "front",
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} connectedUser={connectedUser} />
      )}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />

      <Drawer.Screen
        options={({ navigation }) => ({
          headerShown: true,
          headerTintColor: isDarkMode
            ? MA_REUSSITE_CUSTOM_COLORS.White
            : MA_REUSSITE_CUSTOM_COLORS.Black,
          headerStyle: {
            backgroundColor: isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.Black
              : MA_REUSSITE_CUSTOM_COLORS.White,
          },
          sceneContainerStyle: {
            backgroundColor: isDarkMode
              ? MA_REUSSITE_CUSTOM_COLORS.Black
              : MA_REUSSITE_CUSTOM_COLORS.White,
          },
          headerLeft: () => (
            <IconButton
              icon={
                <Icon
                  as={MaterialIcons}
                  name="arrow-back"
                  size="lg"
                  color={
                    isDarkMode
                      ? MA_REUSSITE_CUSTOM_COLORS.White
                      : MA_REUSSITE_CUSTOM_COLORS.Black
                  }
                />
              }
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        name="Profil"
        component={ProfileScreen}
      />

      <Drawer.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Session"
        component={SessionsScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
