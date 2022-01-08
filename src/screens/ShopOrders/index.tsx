import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { ShopOrderItem } from '../../components/ShopOrderItem';
import { Colors } from '../../constants';
import { fetchOrders } from '../../store/actions/orders';
import { useAppDispatch, useAppSelector } from '../../store/app/rootReducer';
import { style as s } from './styles';

export const ShopOrders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useAppSelector((state) => state.orders.orders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchOrders()).then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={s.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={s.centered}>
        <Text>No orders found, maybe start ordering some</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={orders}
        renderItem={(itemData) => (
          <ShopOrderItem amount={itemData.item.totalAmount} date={itemData.item.date} items={itemData.item.items} />
        )}
      />
    </View>
  );
};
