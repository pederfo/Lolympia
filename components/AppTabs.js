import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "../screens/homeScreen";
import Chat from "./Chat";
import Login from "./Login2";
import colors from "../config/colors";
import Results from "../screens/resultScreen";

const Tab = createBottomTabNavigator();

function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="MAIN"
      screenOptions={{
        tabBarActiveTintColor: colors.cyan,
        tabBarInactiveTintColor: colors.cyan,
        tabBarActiveBackgroundColor: colors.blue_dark,
        tabBarInactiveBackgroundColor: colors.primary,
        tabBarStyle: [
          {
            display: "flex",
            borderTopColor: colors.primary,
          },
          null,
        ],
        headerShown: false,
        tabBarIcon: () => {},
      }}
    >
      <Tab.Screen name="MAIN" component={HomeScreen} />
      <Tab.Screen name="PRAT" component={Chat} />
      <Tab.Screen name="RESULTS" component={Results} />
    </Tab.Navigator>
  );
}

// function AppTabs() {
//   return (
//     <NavigationContainer>
//       <Tabs />
//     </NavigationContainer>
//   );
// }

export default AppTabs;
