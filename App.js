
import React from 'react';
import { StyleSheet, LogBox } from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';

import colors from "./config/colors";
import Login from './components/Login2';
import { createStackNavigator } from "@react-navigation/stack";
import AppTabs from './components/AppTabs';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();
function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" gestureEnabled={false} screenOptions={{headerShown: false}} >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="App" component={AppTabs} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    height: 50
  }
});
