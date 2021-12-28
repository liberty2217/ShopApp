import React from 'react';
import { Colors } from '../constants';
import shoppingCart from '../assets/icons/shoppingCart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import copy from '../assets/icons/copy';
import { UIIconButton } from '../components/UI/UIHeaderButton';
import { ProductsNavigator } from './ProductsNavigator';
import { OrdersNavigator } from './OrdersNavigator';

const Shop = createBottomTabNavigator();

export const ShopNavigator = () => {
  return (
    <Shop.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: Colors.primary }}>
      <Shop.Screen
        name="ProductsNavigator"
        component={ProductsNavigator}
        options={{
          tabBarLabel: 'Shop',
          tabBarIcon: () => <UIIconButton icon={shoppingCart({ color: Colors.primary })} />,
        }}
      />
      <Shop.Screen
        name="OrdersNavigator"
        component={OrdersNavigator}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: () => <UIIconButton icon={copy({ color: Colors.primary })} />,
        }}
      />
    </Shop.Navigator>
  );
};
