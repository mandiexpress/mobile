import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {routes} from '../../shared/constants';
import MainBottomNavigator from '../MainBottomNavigator';
import LoginScreen from '../../screens/LoginScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import OrderDetailScreen from '../../screens/OrderDetailScreen';

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routes.HOME_NAVIGATOR}>
      <Stack.Screen
        component={MainBottomNavigator}
        name={routes.HOME_NAVIGATOR}
      />
      <Stack.Screen name={routes.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen
        name={routes.REGISTRATION_SCREEN}
        component={SignUpScreen}
      />
      <Stack.Screen name={routes.CART_SCREEN} component={CartScreen} />
      <Stack.Screen name={routes.CHECKOUT_SCREEN} component={CheckoutScreen} />
      <Stack.Screen
        name={routes.ORDER_DETAIL_SCREEN}
        component={OrderDetailScreen}
      />
    </Stack.Navigator>
  );
}
