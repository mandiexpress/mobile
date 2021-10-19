import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useSelector } from 'react-redux';
import CartScreen from '../../screens/CartScreen';
import CategoriesListScreen from '../../screens/CategoriesListScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';
import EditProfile from '../../screens/EditProfile';
import IntroductionScreen from '../../screens/IntroductionScreen';
import LoginScreen from '../../screens/LoginScreen';
import LoginVerifyScreen from '../../screens/LoginVerifyScreen';
import OrderDetailScreen from '../../screens/OrderDetailScreen';
import OrdersScreen from '../../screens/OrdersListScreen';
import PrivacyPolicy from '../../screens/PrivacyPolicy';
import ProductList from '../../screens/ProductList';
import ProfileScreen from '../../screens/ProfileScreen';
import PromotionDetailScreen from '../../screens/PromotionDetailScreen';
import PromotionListScreen from '../../screens/PromotionListScreen';
import RegisterVerifyScreen from '../../screens/RegisterVerifyScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import Statistics from '../../screens/Statistics';
import TermsAndConditions from '../../screens/TermsAndConditions';
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
        name={routes.ORDER_DETAIL_SCREEN}
        component={OrderDetailScreen}
      />
      <Stack.Screen
        name={routes.PROMOTION_DETAIL_SCREEN}
        component={PromotionDetailScreen}
      />
      <Stack.Screen
        name={routes.PROMOTION_LIST_SCREEN}
        component={PromotionListScreen}
      />
      <Stack.Screen
        name={routes.CATEGORIES_LIST_SCREEN}
        component={CategoriesListScreen}
      />
      <Stack.Screen
        name={routes.PRODUCTS_LIST_SCREEN}
        component={ProductList}
      />
      <Stack.Screen name={routes.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={routes.ORDER_SCREEN} component={OrdersScreen} />
      <Stack.Screen name={routes.EDIT_PROFILE_SCREEN} component={EditProfile} />
      <Stack.Screen name={routes.STATISTICS_SCREEN} component={Statistics} />
      <Stack.Screen
        name={routes.TERMS_AND_CONDITIONS}
        component={TermsAndConditions}
      />
      <Stack.Screen name={routes.PRIVACY_POLICY} component={PrivacyPolicy} />
      <Stack.Screen
        name={routes.REGISTER_VERIFY_SCREEN}
        component={RegisterVerifyScreen}
      />
      <Stack.Screen
        name={routes.LOGIN_VERIFY_SCREEN}
        component={LoginVerifyScreen}
      />
    </Stack.Navigator>
  );
}
