import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants';
import { ShopProductsOverview } from '../screens/ShopProductsOverview';
import { Platform } from 'react-native';
import { ShopProductDetails } from '../screens/ShopProductDetails';
import { Products } from '../data/type';
import shoppingCart from '../assets/icons/shoppingCart';
import { ShopCart } from '../screens/ShopCart';
import { UIIconButton } from '../components/UI/UIHeaderButton';

export type ProductStackParamList = {
  ShopProductsOverview: undefined;
  ShopProductDetails: { productId: Products['id']; productTitle: Products['title'] };
  ShopCart: undefined;
};

const Product = createNativeStackNavigator<ProductStackParamList>();

export const ProductsNavigator: React.FC = () => {
  return (
    <Product.Navigator
      initialRouteName="ShopProductsOverview"
      screenOptions={{
        headerStyle: { backgroundColor: Platform.OS === 'android' ? Colors.primary : '' },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
        },
      }}
    >
      <Product.Screen
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
      <Product.Screen
        name="ShopProductDetails"
        component={ShopProductDetails}
        options={({ route }) => ({
          title: route.params.productTitle,
        })}
      />
      <Product.Screen name="ShopCart" component={ShopCart} />
    </Product.Navigator>
  );
};
