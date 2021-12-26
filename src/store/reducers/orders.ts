import { ADD_ORDER } from '../actions/orders';
import { CartItem } from './cart';

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
};

const initialState = {
  orders: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const newOrder: Order = {
        // "id" is "generated" on the server when we create an order
        id: new Date().toString(),
        items: action.orderData.items,
        totalAmount: action.orderData.totalAmount,
        date: new Date().toString(),
      };
      return { ...state, orders: state.orders.concat(newOrder) };
    }
    default:
      return state;
  }
};
