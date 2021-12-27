import { ADD_ORDER } from '../actions/orders';
import { CartItem } from './cart';

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
  date: string;
};

export interface ActionAddOrder {
  type: 'ADD_ORDER';
  orderData: {
    items: CartItem[];
    amount: number;
  };
}

type Action = ActionAddOrder;

type OrdersReducerInitialState = {
  orders: Order[];
};

const initialState: OrdersReducerInitialState = {
  orders: [],
};

export const ordersReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD_ORDER: {
      const newOrder: Order = {
        // "id" is "generated" on the server when we create an order
        id: new Date().toString(),
        items: action.orderData.items,
        totalAmount: action.orderData.amount,
        date: new Date().toString(),
      };
      return { ...state, orders: state.orders.concat(newOrder) };
    }
    default:
      return state;
  }
};
