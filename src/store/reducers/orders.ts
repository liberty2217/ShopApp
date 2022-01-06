import { ADD_ORDER, SET_ORDERS, TransformedCartItems } from '../actions/orders';
import { format } from 'date-fns';

export type Order = {
  id: string;
  items: TransformedCartItems[];
  totalAmount: number;
  date: string;
};

export interface ActionAddOrder {
  type: typeof ADD_ORDER;
  orderData: {
    id: string;
    items: TransformedCartItems[];
    amount: number;
    date: string;
  };
}

export interface ActionSetOrder {
  type: typeof SET_ORDERS;
  orders: Order[];
}

type Action = ActionAddOrder | ActionSetOrder;

type OrdersReducerInitialState = {
  orders: Order[];
};

const initialState: OrdersReducerInitialState = {
  orders: [],
};

export const ordersReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_ORDERS: {
      return {
        orders: action.orders,
      };
    }
    case ADD_ORDER: {
      const newOrder: Order = {
        // "id" is "generated" on the server when we create an order
        id: action.orderData.id,
        items: action.orderData.items,
        totalAmount: action.orderData.amount,
        // date: action.orderData.date,
        date: action.orderData.date,
      };
      return { ...state, orders: state.orders.concat(newOrder) };
    }
    default:
      return state;
  }
};
