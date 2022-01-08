import { Products } from '../../data/type';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export type CartItem = {
  [key: string]: {
    quantity: number;
    prodPrice: Products['price'];
    prodTitle: Products['title'];
    sum: number;
  };
};

export type ActionAddToCart = {
  type: typeof ADD_TO_CART;
  payload: Products;
};

export type ActionRemoveFromCart = {
  type: typeof REMOVE_FROM_CART;
  pid: Products['id'];
};

export const addToCart = (product: Products) => {
  return { type: ADD_TO_CART, payload: product };
};

export const removeFromCart = (productId: Products['id']) => {
  return { type: REMOVE_FROM_CART, pid: productId };
};
