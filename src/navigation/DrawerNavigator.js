import { createDrawerNavigator } from "@react-navigation/drawer";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { getObject } from "../api/apiClient";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { useThemeContext } from "../hooks/ThemeContext";
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
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
