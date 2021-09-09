import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import {useSelector} from 'react-redux';
import CartScreen from '../../screens/CartScreen';
import HomeScreen from '../../screens/HomeScreen';
import {colors, icons, routes} from '../../shared/constants';
import OrdersNavigator from '../OrdersNavigator';
import AuthNavigator from '../AuthNavigator';

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  activeTintColor: colors.DARK_BLUE,
  inactiveTintColor: 'grey',
  tabStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  style: {
    borderTopWidth: 0,
    backgroundColor: 'white',
  },
};

function MainBottomNavigator() {
  const {items} = useSelector(state => state.root.cart);

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          tabBarLabel: 'HOME',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 23,
                  width: 23,
                  tintColor: focused ? colors.DARK_BLUE : 'black',
                }}
                source={icons.HOME}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={'Orders'}
        component={OrdersNavigator}
        options={{
          tabBarLabel: 'ORDERS',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 23,
                  width: 23,
                  tintColor: focused ? colors.DARK_BLUE : 'black',
                }}
                source={icons.ORDER}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={'Cart'}
        component={CartScreen}
        options={{
          tabBarBadge: items.length,
          tabBarBadgeStyle: {
            fontWeight: 'bold',
            backgroundColor: 'green',
            fontSize: 12,
          },
          tabBarLabel: 'CART',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 23,
                  width: 23,
                  tintColor: focused ? colors.DARK_BLUE : 'black',
                }}
                source={icons.CART}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={routes.PROFILE_SCREEN}
        component={AuthNavigator}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  height: 23,
                  width: 23,
                  tintColor: focused ? colors.DARK_BLUE : 'black',
                }}
                source={icons.PROFILE}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default MainBottomNavigator;
