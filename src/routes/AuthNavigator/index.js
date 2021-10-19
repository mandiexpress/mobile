import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import LoginScreen from '../../screens/LoginScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import { routes } from '../../shared/constants';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  const { isLoggedIn } = useSelector(state => state.root.user);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        isLoggedIn ? routes.PROFILE_SCREEN : routes.LOGIN_SCREEN
      }>
      <Stack.Screen
        component={isLoggedIn ? ProfileScreen : LoginScreen}
        name={isLoggedIn ? routes.PROFILE_SCREEN : routes.LOGIN_SCREEN}
      />
    </Stack.Navigator>
  );
}
