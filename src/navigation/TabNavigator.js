import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import ActivityScreen from "../screens/ActivityScreen";
import GroupScreen from "../screens/GroupScreen";
import HomeScreen from "../screens/HomeScreen";
import NoteScreen from "../screens/NoteScreen";
import PaymentScreen from "../screens/PaymentScreen";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import IconHome from "../../assets/images/home.png";
import IconPayment from "../../assets/images/payment.png";
import IconNotifications from "../../assets/images/notifications.png";
import IconGroups from "../../assets/images/group.png";
import IconNotes from "../../assets/images/notes.png";
import { Image } from "react-native";
import CustomTabBarButton from "../components/CustomTabBarButton";
import { getUserInfo } from "../utils/AuthService";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const propagatedRoute = useRoute();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const run = async () => setUser(await getUserInfo());
    run();
  }, []);

  const getPaymentTab = () => {
    switch (user?.craft_role) {
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
    switch (user?.craft_role) {
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let CustomIcon;
            route.params = propagatedRoute?.params;

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
          unmountOnBlur: true,
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarActiveBackgroundColor: "white",

          tabBarStyle: {
            backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
            height: 72,
            paddingTop: 8
          },
          headerShown: false,
          tabBarShowLabel: true,
        })}
        safeAreaInsets={{ bottom: 20 }}
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
  );
};
