import React, { useState } from 'react';
import { View, Button, Text, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { ShopCartItem } from '../../components/ShopCartItem';
import { Card } from '../../components/UI/Card';
import { Colors } from '../../constants';
import { removeFromCart } from '../../store/actions/cart';
import { addOrder } from '../../store/actions/orders';
import { useAppSelector } from '../../store/app/rootReducer';
import { styles as s } from './styles';

export const ShopCart = () => {
  const [isLoading, setIsLoading] = useState(false);

  const cartTotalAmount = useAppSelector((state) => state.cart.totalAmount);

  const cartItems = useAppSelector((state) => {
    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].prodTitle,
        productPrice: state.cart.items[key].prodPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItems;
  });

  const dispatch = useDispatch();

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };

  return (
    <View style={s.screen}>
      <Card style={s.summary}>
        <Text style={s.summaryText}>
          Total: <Text style={s.amount}>${Math.round(+cartTotalAmount.toFixed(2) * 100) / 100}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            title="Order Now"
            color={Colors.accent}
            disabled={cartItems.length === 0}
            onPress={sendOrderHandler}
          />
        )}
      </Card>

      <FlatList
        data={cartItems}
        renderItem={(itemData) => (
          <ShopCartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            deletable={true}
            amount={itemData.item.sum}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.productId));
            }}
          />
        )}
      />
    </View>
  );
};
