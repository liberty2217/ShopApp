import { ADD_TO_CART } from './cart';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return { type: ADD_TO_CART, orderData: { items: cartItems, amount: totalAmount } };
};
