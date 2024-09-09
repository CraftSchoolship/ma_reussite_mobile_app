import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { TabNavigator } from "./TabNavigator";
import { ParentTabNavigator } from "./ParentTabNavigator";
import { TeacherTabNavigator } from "./TeacherTabNavigator";
import { AdminTabNavigator } from "./AdminTabNavigator";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { getObject } from "../api/apiClient";
import { useRoute } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const route = useRoute();
  const [connectedUser, setConnectedUser] = useState(null);
  const [childrenList, setChildrenList] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      // console.log("ok...");

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
  }, [connectedUser]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getObject("connectedUser");
        if (user) {
          setConnectedUser(user);

          if (user.role === "parent") {
            // console.log("connectedUser role:", user.role);
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
