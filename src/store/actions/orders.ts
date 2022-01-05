import { format } from 'date-fns';
import { Dispatch } from 'react';
import { Products } from '../../data/type';
import { ActionAddOrder } from '../reducers/orders';

export const ADD_ORDER = 'ADD_ORDER';

export type TransformedCartItems = {
  productId: Products['id'];
  productTitle: Products['title'];
  productPrice: Products['price'];
  quantity: number;
  sum: number;
};

export const addOrder = (cartItems: TransformedCartItems[], totalAmount: number) => {
  return async (dispatch: Dispatch<ActionAddOrder>) => {
    const date = new Date();
    const response = await fetch('https://rn-complete-guide-81bea-default-rtdb.firebaseio.com/orders/u1.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItems,
        totalAmount,
        date: format(date, 'dd/MM/yyyy'),
      }),
    });

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
