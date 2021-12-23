import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants';
import { ShopProductsOverviewScreen } from '../screens/ShopProductsOverview';
import { Platform } from 'react-native';

const Shop = createNativeStackNavigator();

export const ShopNavigator: React.FC = () => {
  return (
    <Shop.Navigator
      initialRouteName="ShopProductsOverview"
      screenOptions={{
        headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
      }}
    >
      <Shop.Screen name="ShopProductsOverview" component={ShopProductsOverviewScreen} />
    </Shop.Navigator>
  );
};
