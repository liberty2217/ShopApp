import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { ShopOrderItem } from '../../components/ShopOrderItem';
import { useAppSelector } from '../../store/app/rootReducer';
import { style as s } from './styles';

export const ShopOrders = () => {
  const orders = useAppSelector((state) => state.orders.orders);

  const emptyOrderList = orders.length === 0 ? <Text style={s.emptyListText}>There are no orders yet</Text> : null;

  return (
    <View>
      {emptyOrderList}
      <FlatList
        data={orders}
        renderItem={(itemData) => (
          <ShopOrderItem amount={itemData.item.totalAmount} date={itemData.item.date} items={itemData.item.items} />
        )}
      />
    </View>
  );
};
