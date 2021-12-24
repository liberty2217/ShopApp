import { PayloadAction } from '@reduxjs/toolkit';
import { Products } from '../../data/type';
import { ADD_TO_CART } from '../actions/cart';

//change
export type CartItem = {
  [key: string]: {
    quantity: number;
    prodPrice: number;
    prodTitle: string;
    sum: number;
  };
};

interface CartReducerInitialState {
  items: CartItem;
  totalAmount: number;
}

const initialState: CartReducerInitialState = {
  items: {
    p1: {
      quantity: 0,
      prodPrice: 0,
      prodTitle: '',
      sum: 0,
    },
  },
  totalAmount: 0,
};

export const cartReducer = (state = initialState, action: PayloadAction<Products>) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const addedProduct = action.payload;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      if (state.items[addedProduct.id]) {
        //already have the item in the cart
        const updatedCartItem = {
          quantity: state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          sum: state.items[addedProduct.id].sum + prodPrice,
        };
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: updatedCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      } else {
        const newCartItem = { quantity: 1, prodPrice, prodTitle, sum: prodPrice };
        return {
          ...state,
          items: { ...state.items, [addedProduct.id]: newCartItem },
          totalAmount: state.totalAmount + prodPrice,
        };
      }
    }
  }
  return state;
};
