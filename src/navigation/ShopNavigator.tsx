import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants';
import { ShopProductsOverview } from '../screens/ShopProductsOverview';
import { Button, Platform } from 'react-native';
import { ShopProductDetails } from '../screens/ShopProductDetails';
import { Products } from '../data/type';
import { UIIconButton } from '../components/ShopProductItem/UI/UIHeaderButton';
import shoppingCart from '../assets/icons/shoppingCart';
import { ShopCart } from '../screens/ShopCart';

export type ShopStackParamList = {
  ShopProductsOverview: undefined;
  ShopProductDetails: { productId: Products['id']; productTitle: Products['title'] };
  ShopCart: undefined;
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
        options={({ navigation }) => ({
          title: 'All Products',
          headerRight: () => (
            <UIIconButton
              onPress={() => navigation.navigate('ShopCart')}
              icon={shoppingCart({ color: Platform.OS === 'android' ? '#FFFFFF' : Colors.primary })}
            />
          ),
        })}
      />

      <Shop.Screen
        name="ShopProductDetails"
        component={ShopProductDetails}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />

      <Shop.Screen name="ShopCart" component={ShopCart} />
    </Shop.Navigator>
  );
};
