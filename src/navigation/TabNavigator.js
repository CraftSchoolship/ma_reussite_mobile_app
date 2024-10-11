import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityScreen,
  GroupScreen,
  HomeScreen,
  NoteScreen,
  PaymentScreen,
} from "../screens";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import AppProvider from "../hooks/AppProvider";
import IconHome from "../../assets/images/home.png";
import IconPayment from "../../assets/images/payment.png";
import IconNotifications from "../../assets/images/notifications.png";
import IconGroups from "../../assets/images/group.png";
import IconNotes from "../../assets/images/notes.png";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomTabBarButton from "../components/CustomTabBarButton";
import { getObject } from "../api/apiClient";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  const propagedRoute = useRoute();
  const [connectedUser, setConnectedUser] = useState(null);

  useEffect(() => {
    const fetchConnectedUser = async () => {
      try {
        const storedUser = await getObject("connectedUser");
        // console.log("storedUser...", storedUser);

        setConnectedUser(storedUser);
      } catch (error) {}
    };
    if (!connectedUser) fetchConnectedUser();
  }, [connectedUser]);

  const getPaymentTab = () => {
    switch (connectedUser?.role) {
      case "student":
      case "parent":
      case "teacher":
        return (
          <Tab.Screen
          name="Payment"
          component={PaymentScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        );
      default:
        return null;
    }
  };

  const getNoteTab = () => {
    switch (connectedUser?.role) {
      case "student":
      case "parent":
        return (
          <Tab.Screen
          name="Notes"
          component={NoteScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        );
      default:
        return null;
    }
  };

  return (
    <AppProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let CustomIcon;
            route.params = propagedRoute?.params;

            if (route.name === "Home") {
              CustomIcon = IconHome;
            } else if (route.name === "Payment") {
              CustomIcon = IconPayment;
            } else if (route.name === "Groups") {
              CustomIcon = IconGroups;
            } else if (route.name === "Notes") {
              CustomIcon = IconNotes;
            } else if (route.name === "Activities") {
              CustomIcon = IconNotifications;
            }

            return (
              <Image
                source={CustomIcon}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            );
          },
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "white",

          tabBarStyle: {
            backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
          },
          headerShown: false,
          tabBarShowLabel: true,
        })}
        safeAreaInsets={{ bottom: 40 }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
      {getPaymentTab()}
       <Tab.Screen
          name="Groups"
          component={GroupScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
      {getNoteTab()}
      <Tab.Screen
          name="Activities"
          component={ActivityScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
    </Tab.Navigator>
  </AppProvider>
  );
};
