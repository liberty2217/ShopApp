import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants';
import { ShopProductsOverview } from '../screens/ShopProductsOverview';
import { Platform } from 'react-native';
import { ShopProductDetails } from '../screens/ShopProductDetails';
import { Products } from '../data/type';
import { UIIconButton } from '../components/ShopProductItem/UI/UIHeaderButton';
import shoppingCart from '../assets/icons/shoppingCart';
import { ShopCart } from '../screens/ShopCart';
import { ShopOrders } from '../screens/ShopOrders';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import copy from '../assets/icons/copy';

export type ShopStackParamList = {
  ShopProductsOverview: undefined;
  ShopProductDetails: { productId: Products['id']; productTitle: Products['title'] };
  ShopCart: undefined;
};

const Product = createNativeStackNavigator<ShopStackParamList>();

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
        name="ShopOrders"
        component={ShopOrders}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: () => <UIIconButton icon={copy({ color: Colors.primary })} />,
        }}
      />
    </Shop.Navigator>
  );
};

// export type OrderStackParamList = {
//   ShopOrders: undefined;
// };

// const Orders = createNativeStackNavigator();

// export const OrdersNavigator: React.FC = () => {
//   return (
//     <Orders.Navigator>
//       <Orders.Screen name="ShopOrders" component={ShopOrders} />
//     </Orders.Navigator>
//   );
// };

// export const Shop = createDrawerNavigator();

// export const ShopNavigator: React.FC = () => {
//   return (
//     <Shop.Navigator>
//       <Shop.Screen name="ProductsNavigator" component={ProductsNavigator} />
//       <Shop.Screen name="OrdersNavigator" component={OrdersNavigator} />
//     </Shop.Navigator>
//   );
// };
