import { Products } from '../../data/type';

export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product: Products) => {
  return { type: ADD_TO_CART, payload: product };
};
