import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../app/rootReducer';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export type AuthAction = {
  type: typeof SIGNUP | typeof LOGIN;
  token: string;
  userId: string;
};

type SignupResultResponse = {
  idToken: string;
  localId: string;
};

export const signup = (email: string, password: string): ThunkAction<void, RootState, unknown, AuthAction> => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBIzLitTxf-IWs4ewZEmlccGeZYlTCtuYA',

      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;

      let message = 'Something went wrong';

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This E-mail not found';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid';
      } else if (errorId === 'EMAIL_EXISTS') {
        message = 'This E-mail already exists';
      }
      throw new Error(message);
    }

    const resData: SignupResultResponse = await response.json();

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (email: string, password: string): ThunkAction<void, RootState, unknown, AuthAction> => {
  return async (dispatch) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBIzLitTxf-IWs4ewZEmlccGeZYlTCtuYA',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData: SignupResultResponse = await response.json();

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};
