import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {useSelector} from 'react-redux';
import LoginScreen from '../../screens/LoginScreen';
import OrdersScreen from '../../screens/OrdersListScreen';
import {routes} from '../../shared/constants';

const Stack = createStackNavigator();

export default function OrdersNavigator() {
  const {isLoggedIn} = useSelector(state => state.root.user);
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={isLoggedIn ? routes.ORDER_SCREEN : routes.LOGIN_SCREEN}>
      <Stack.Screen
        component={isLoggedIn ? OrdersScreen : LoginScreen}
        name={isLoggedIn ? routes.ORDER_SCREEN : routes.LOGIN_SCREEN}
      />
    </Stack.Navigator>
  );
}
