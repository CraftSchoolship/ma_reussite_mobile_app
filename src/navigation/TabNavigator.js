import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";
import {
  ActivityScreen,
  GroupScreen,
  HomeScreen,
  NoteScreen,
  PaymentScreen,
} from "../screens";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Payment") {
            iconName = "euro-symbol";
          } else if (route.name === "Groups") {
            iconName = "group";
          } else if (route.name === "Notes") {
            iconName = "timeline";
          } else if (route.name === "Activities") {
            iconName = "notifications";
          }

          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
        tabBarInactiveTintColor: "white",
        tabBarActiveBackgroundColor: "white",
        tabBarIconStyle: {
          backgroundColor: "white",
        },
        tabBarStyle: { backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ tabBarLabel: "Payement" }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupScreen}
        options={{ tabBarLabel: "Groupes" }}
      />
      <Tab.Screen
        name="Notes"
        component={NoteScreen}
        options={{ tabBarLabel: "Notes" }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivityScreen}
        options={{ tabBarLabel: "Activités" }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "../screens/HomeScreen";
// // import SettingsScreen from "../screens/SettingsScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import { MaterialIcons } from "@expo/vector-icons";
// import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

// const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarActiveTintColor: "white",
//         tabBarInactiveTintColor: "white",
//         tabBarStyle: [
//           {
//             display: "flex",
//             backgroundColor: MA_REUSSITE_CUSTOM_COLORS.Primary,
//           },
//           null,
//         ],
//       }}
//     >
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       {/* <Tab.Screen
//         name="Settings"
//         component={SettingsScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="settings" color={color} size={size} />
//           ),
//         }}
//       /> */}
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <MaterialIcons name="person" color={color} size={size} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default TabNavigator;
