import React, { useState } from "react";
import { Text, Box, HStack, IconButton } from "native-base";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import MA_REUSSITE_CUSTOM_COLORS from "../themes/variables";

const Tab = createMaterialTopTabNavigator();

const FirstScreen = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text>Premier Onglet</Text>
  </Box>
);

const SecondScreen = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text>Deuxième Onglet</Text>
  </Box>
);

const ThirdScreen = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <Text>Troisième Onglet</Text>
  </Box>
);

const ChevronTabs = () => {
  const [visibleTab, setVisibleTab] = useState("first");

  return (
    <Box flex={1}>
      <HStack alignItems="center" justifyContent="space-between" /* p={2} */>
        {/* Chevron gauche */}
        {visibleTab === "second" && (
          <IconButton
            icon={<MaterialIcons name="chevron-left" size={24} />}
            onPress={() => setVisibleTab("first")}
          />
        )}

        {/* Navigation avec onglets */}
        <Box flex={1} bg={"amber.300"}>
          {visibleTab === "first" ? (
            <Tab.Navigator style={{ backgroundColor: "red" }}>
              <Tab.Screen
                options={{
                  tabBarStyle: "red",
                  tabBarContentContainerStyle: "red",
                }}
                name="Premier"
                component={FirstScreen}
              />
              <Tab.Screen name="Deuxième" component={SecondScreen} />
            </Tab.Navigator>
          ) : (
            <Tab.Navigator>
              <Tab.Screen name="Deuxième" component={SecondScreen} />
              <Tab.Screen name="Troisième" component={ThirdScreen} />
            </Tab.Navigator>
          )}
        </Box>

        {/* Chevron droit */}
        {visibleTab === "first" && (
          <IconButton
            // bg={"amber.300"}
            icon={<MaterialIcons name="chevron-right" size={24} />}
            onPress={() => setVisibleTab("second")}
          />
        )}
      </HStack>
    </Box>
  );
};

export default ChevronTabs;
