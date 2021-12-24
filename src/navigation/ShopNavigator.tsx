import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants';
import { ShopProductsOverview } from '../screens/ShopProductsOverview';
import { Button, Platform } from 'react-native';
import { ShopProductDetails } from '../screens/ShopProductDetails';
import { Products } from '../data/type';

export type ShopStackParamList = {
  ShopProductsOverview: undefined;
  ShopProductDetails: { productId: Products['id']; productTitle: Products['title'] };
};

const Shop = createNativeStackNavigator<ShopStackParamList>();

export const ShopNavigator: React.FC = () => {
  return (
    <Shop.Navigator
      initialRouteName="ShopProductsOverview"
      screenOptions={{
        headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
        },
      }}
    >
      <Shop.Screen
        name="ShopProductsOverview"
        component={ShopProductsOverview}
        options={{
          title: 'All Products',
          headerRight: () => <Button onPress={() => console.log('This is a button!')} title="Info" color="red" />,
        }}
      />

      <Shop.Screen
        name="ShopProductDetails"
        component={ShopProductDetails}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
    </Shop.Navigator>
  );
};
