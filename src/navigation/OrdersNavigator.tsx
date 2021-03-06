import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopOrders } from '../screens/ShopOrders';
import { Colors } from '../constants';

export type OrdersStackParamList = {
  Orders: undefined;
};

const Orders = createNativeStackNavigator<OrdersStackParamList>();

export const OrdersNavigator = () => {
  return (
    <Orders.Navigator
      screenOptions={{
        headerTitle: 'Your Orders',
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
          color: Colors.primary,
        },
      }}
    >
      <Orders.Screen name="Orders" component={ShopOrders} />
    </Orders.Navigator>
  );
};
