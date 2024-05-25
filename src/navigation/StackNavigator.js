import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import FormScreen from '../screens/FormScreen/FormScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen options={{headerShown: false}} name="Main" component={TabNavigator} />
      <Stack.Screen options={{ headerShown: false }} name="Form" component={FormScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
