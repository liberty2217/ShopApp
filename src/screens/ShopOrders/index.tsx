import { format } from 'date-fns';
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

  const emptyOrderList = orders.length === 0 ? <Text style={s.emptyListText}>There are no orders yet</Text> : null;

  return (
    <View>
      {emptyOrderList}
      <FlatList
        data={orders}
        renderItem={(itemData) => (
          <ShopOrderItem
            amount={itemData.item.totalAmount}
            // date={format(new Date(itemData.item.date), 'dd/MM/yyyy')}
            date={itemData.item.date}
            items={itemData.item.items}
          />
        )}
      />
    </View>
  );
};
