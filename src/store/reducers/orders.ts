import { ADD_ORDER, TransformedCartItems } from '../actions/orders';
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
    items: TransformedCartItems[];
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
        date: format(new Date(), 'dd/MM/yyyy'),
      };
      return { ...state, orders: state.orders.concat(newOrder) };
    }
    default:
      return state;
  }
};
