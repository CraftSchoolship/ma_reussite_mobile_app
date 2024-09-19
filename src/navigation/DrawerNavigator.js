import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { TabNavigator } from "./TabNavigator";
import { ParentTabNavigator } from "./ParentTabNavigator";
import { TeacherTabNavigator } from "./TeacherTabNavigator";
import { AdminTabNavigator } from "./AdminTabNavigator";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { getObject } from "../api/apiClient";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [connectedUser, setConnectedUser] = useState(null);
  const [childrenList, setChildrenList] = useState([]);

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

  const getTabNavigatorForRole = (role) => {
    switch (role) {
      case "parent":
        return ParentTabNavigator;
      case "teacher":
        return TeacherTabNavigator;
      case "admin":
        return AdminTabNavigator;
      case "student":
      default:
        return TabNavigator;
    }
  };

  if (!connectedUser) {
    return null;
  }

  const TabNavigatorComponent = getTabNavigatorForRole(connectedUser.role);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: "right",
        drawerStyle: {
          margin: 0,
          padding: 0,
        },
        drawerType: "front",
      }}
      drawerContent={(props) => (
        <CustomDrawerContent {...props} connectedUser={connectedUser} />
      )}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigatorComponent}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
