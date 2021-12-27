import { CartItem } from '../reducers/cart';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems: CartItem[], totalAmount: number) => {
  return { type: ADD_ORDER, orderData: { items: cartItems, amount: totalAmount } };
};
