import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddressManagementScreen from '../../screens/AddressManagementScreen';
import CategoriesListScreen from '../../screens/CategoriesListScreen';
import EditProfile from '../../screens/EditProfile';
import HomeScreen from '../../screens/HomeScreen';
import OrderDetailScreen from '../../screens/OrderDetailScreen';
import OrdersScreen from '../../screens/OrdersListScreen';
import PrivacyPolicy from '../../screens/PrivacyPolicy';
import ProductList from '../../screens/ProductList';
import ProfileScreen from '../../screens/ProfileScreen';
import PromotionDetailScreen from '../../screens/PromotionDetailScreen';
import PromotionListScreen from '../../screens/PromotionListScreen';
import Statistics from '../../screens/Statistics';
import TermsAndConditions from '../../screens/TermsAndConditions';
import { routes } from '../../shared/constants';

const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={routes.HOME_NAVIGATOR}>
      <Stack.Screen component={HomeScreen} name={routes.HOME_NAVIGATOR} />
      <Stack.Screen
        component={PromotionDetailScreen}
        name={routes.PROMOTION_DETAIL_SCREEN}
      />
      <Stack.Screen
        component={PromotionListScreen}
        name={routes.PROMOTION_LIST_SCREEN}
      />
      <Stack.Screen
        component={CategoriesListScreen}
        name={routes.CATEGORIES_LIST_SCREEN}
      />
      <Stack.Screen
        component={ProductList}
        name={routes.PRODUCTS_LIST_SCREEN}
      />
      <Stack.Screen component={ProfileScreen} name={routes.PROFILE_SCREEN} />
      <Stack.Screen component={EditProfile} name={routes.EDIT_PROFILE_SCREEN} />
      <Stack.Screen
        component={AddressManagementScreen}
        name={routes.LIST_ADDRESS_SCREEN}
      />
      <Stack.Screen component={OrdersScreen} name={routes.ORDER_SCREEN} />
      <Stack.Screen
        component={OrderDetailScreen}
        name={routes.ORDER_DETAIL_SCREEN}
      />
      <Stack.Screen component={Statistics} name={routes.STATISTICS_SCREEN} />
      <Stack.Screen
        component={TermsAndConditions}
        name={routes.TERMS_AND_CONDITIONS}
      />
      <Stack.Screen component={PrivacyPolicy} name={routes.PRIVACY_POLICY} />
    </Stack.Navigator>
  );
}
