import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens/Home';
import { RegisterLoginData } from '../screens/RegisterLoginData';
import { EditLoginData } from '../screens/EditLoginData';

const {
  Navigator,
  Screen
} = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen name="Home" component={Home} />
      <Screen name="RegisterLoginData" component={RegisterLoginData} />
      <Screen name="EditLoginData" component={EditLoginData} />
    </Navigator>
  );
}