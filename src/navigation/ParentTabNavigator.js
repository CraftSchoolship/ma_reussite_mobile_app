import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";
import React from "react";
import {
  ParentActivityScreen,
  ParentGroupScreen,
  ParentHomeScreen,
  ParentNoteScreen,
  ParentPaymentScreen,
} from "../screens";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import { AppProvider } from "../hooks/AppProvider";
import CustomTabBarButton from "../components/CustomTabBarButton";
import IconHome from "../../assets/images/home.png";
import IconPayment from "../../assets/images/payment.png";
import IconNotifications from "../../assets/images/notifications.png";
import IconGroups from "../../assets/images/group.png";
import IconNotes from "../../assets/images/notes.png";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export const ParentTabNavigator = () => {
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
          component={ParentHomeScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Payment"
          component={ParentPaymentScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Groups"
          component={ParentGroupScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Notes"
          component={ParentNoteScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Activities"
          component={ParentActivityScreen}
          options={{
            tabBarButton: (props) => <CustomTabBarButton {...props} />,
          }}
        />
      </Tab.Navigator>
    </AppProvider>
  );
};

// export default ParentTabNavigator;
