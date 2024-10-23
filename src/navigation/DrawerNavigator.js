import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { TabNavigator } from "./TabNavigator";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { getObject } from "../api/apiClient";
import { MaterialIcons } from "@expo/vector-icons";
import { Icon, IconButton } from "native-base";
import { useThemeContext } from "../hooks/ThemeContext";
import { ProfileScreen } from "../screens";
import SessionsScreen from "../screens/SessionsScreen";
import ChildrenScreen from "../screens/ChildrenScreen";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [connectedUser, setConnectedUser] = useState(null);
  const { isDarkMode } = useThemeContext();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getObject("connectedUser");
        if (user) {
          setConnectedUser(user);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchChildrenData = async () => {
      if (connectedUser?.role === "parent") {
        // Fetch children data for parents
        try {
          // Logic to fetch children data if necessary
        } catch (error) {
          console.error("Error fetching children data:", error);
        }
      }
    };

    fetchChildrenData();
  }, [connectedUser]);

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

      <Drawer.Screen
        options={{
          headerBackTitleVisible: false,
          headerShown: false,
        }}
        name="Children"
        component={ChildrenScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
