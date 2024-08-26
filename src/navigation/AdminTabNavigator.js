import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { AppProvider } from "../hooks/AppProvider";
import {
  AdminActivityScreen,
  AdminGroupScreen,
  AdminHomeScreen,
} from "../screens";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import CustomTabBarButton from "../components/CustomTabBarButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import IconHome from "../../assets/images/home.png";
import IconNotifications from "../../assets/images/notifications.png";
import IconGroups from "../../assets/images/group.png";
import { Image } from "react-native";

const Tab = createBottomTabNavigator();

export const AdminTabNavigator = () => {
  const insets = useSafeAreaInsets();
  const propagedRoute = useRoute();
  return (
    <AppProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            let CustomIcon;
            route.params = propagedRoute?.params;

            if (route.name === "Home") {
              CustomIcon = IconHome;
            } else if (route.name === "Groups") {
              CustomIcon = IconGroups;
            } else if (route.name === "Activities") {
              CustomIcon = IconNotifications;
            }

            return (
              <Image
                source={CustomIcon}
                resizeMode="contain"
                style={{
                  width: 26,
                  height: 26,
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
          component={AdminHomeScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Groups"
          component={AdminGroupScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Activities"
          component={AdminActivityScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
      </Tab.Navigator>
    </AppProvider>
  );
};
