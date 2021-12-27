import { Products } from '../../data/type';

export const ADD_ORDER = 'ADD_ORDER';

type TransformedCartItems = {
  productId: Products['id'];
  productTitle: Products['title'];
  productPrice: Products['price'];
  quantity: number;
  sum: number;
};

export const addOrder = (cartItems: TransformedCartItems[], totalAmount: number) => {
  return { type: ADD_ORDER, orderData: { items: cartItems, amount: totalAmount } };
};
