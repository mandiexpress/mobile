import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import AddressManagementScreen from '../../screens/AddressManagementScreen';
import AddAddressScreen from '../../screens/AddAddressScreen';
import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import FavoriteListScreen from '../../screens/FavoriteListScreen';
import IntroductionScreen from '../../screens/IntroductionScreen';
import ItemDetailScreen from '../../screens/ItemDetailScreen';
import LoginScreen from '../../screens/LoginScreen';
import LoginVerifyScreen from '../../screens/LoginVerifyScreen';
import RegisterVerifyScreen from '../../screens/RegisterVerifyScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import { routes } from '../../shared/constants';
import MainBottomNavigator from '../MainBottomNavigator';

const Stack = createStackNavigator();

export default function MainNavigator() {
  const { firstTime } = useSelector(state => state.root.user);
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={
        firstTime ? routes.INTRODUCTION_SCREEN : routes.HOME_NAVIGATOR
      }>
      <Stack.Screen
        component={IntroductionScreen}
        name={routes.INTRODUCTION_SCREEN}
      />
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
        name={routes.REGISTER_VERIFY_SCREEN}
        component={RegisterVerifyScreen}
      />
      <Stack.Screen
        name={routes.LOGIN_VERIFY_SCREEN}
        component={LoginVerifyScreen}
      />
      <Stack.Screen
        name={routes.ITEM_DETAIL_SCREEN}
        component={ItemDetailScreen}
      />
      <Stack.Screen
        name={routes.LIST_ADDRESS_SCREEN}
        component={AddressManagementScreen}
      />
      <Stack.Screen name={routes.ADD_ADDRESS} component={AddAddressScreen} />
      <Stack.Screen
        name={routes.FAVORITE_LIST}
        component={FavoriteListScreen}
      />
    </Stack.Navigator>
  );
}
