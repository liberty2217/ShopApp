import { ActionAddOrder, ActionSetOrder, ADD_ORDER, Order, SET_ORDERS } from '../actions/orders';

type OrdersReducerInitialState = {
  orders: Order[];
};

const initialState: OrdersReducerInitialState = {
  orders: [],
};

type Action = ActionAddOrder | ActionSetOrder;

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
