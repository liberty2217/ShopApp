import React from 'react';
import { FlatList, Text } from 'react-native';
import { useAppSelector } from '../../store/app/rootReducer';

export const ShopOrders = (props) => {
  const orders = useAppSelector((state) => state.orders.orders);

  return <FlatList data={orders} renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>} />;
};
