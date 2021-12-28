import React from 'react';
import { FlatList } from 'react-native';
import { ShopOrderItem } from '../../components/ShopOrderItem';
import { useAppSelector } from '../../store/app/rootReducer';

export const ShopOrders = () => {
  const orders = useAppSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <ShopOrderItem amount={itemData.item.totalAmount} date={itemData.item.date} items={itemData.item.items} />
      )}
    />
  );
};
