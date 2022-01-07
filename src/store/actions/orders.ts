import { ThunkAction } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { Products } from '../../data/type';
import { RootState } from '../app/rootReducer';
import { ActionAddOrder, ActionSetOrder, Order } from '../reducers/orders';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDER';

export const fetchOrders = (): ThunkAction<Promise<void>, RootState, unknown, ActionSetOrder> => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(`https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/orders/${userId}.json`);

      if (!response.ok) {
        // if repsonse is 400 / 500 status code
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();

      const loadedOrders: Order[] = [];

      for (const key in resData) {
        loadedOrders.push({
          id: key,
          items: resData[key].cartItems,
          totalAmount: resData[key].totalAmount,
          date: resData[key].date,
        });
      }

      dispatch({
        type: SET_ORDERS,
        orders: loadedOrders,
      });
    } catch (err) {
      console.log('handling error here');
      throw err;
    }
  };
};

export type TransformedCartItems = {
  productId: Products['id'];
  productTitle: Products['title'];
  productPrice: Products['price'];
  quantity: number;
  sum: number;
};

export const addOrder = (
  cartItems: TransformedCartItems[],
  totalAmount: number,
): ThunkAction<Promise<void>, RootState, unknown, ActionAddOrder> => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const token = getState().auth.token;
    const date = new Date();
    const response = await fetch(
      `https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: format(date, 'dd/MM/yyyy'),
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: format(date, 'dd/MM/yyyy') },
    });
  };
};
