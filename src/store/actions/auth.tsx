import { ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../app/rootReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE'; // is SIGN_IN and SIGN_UP combined
export const LOGOUT = 'LOGOUT';
export const SET_DID_TRY_AL = 'SET_DID_TRY_AL';

export type SetDidTryAutoLoginAction = {
  type: typeof SET_DID_TRY_AL;
};

export type LogoutAction = {
  type: typeof LOGOUT;
};

export type AuthAction = {
  type: typeof AUTHENTICATE;
  token: string;
  userId: string;
};

type SignupResultResponse = {
  idToken: string;
  localId: string;
  expiresIn: string; // number in string
};

export const setDidTryAL = () => {
  return { type: SET_DID_TRY_AL };
};

let timer: ReturnType<typeof setTimeout>;

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');

  return { type: LOGOUT };
};

// autologout if "expiresIn" response property from signIn/signUp expired
const setLogoutTimer = (expirationTime: number): ThunkAction<void, RootState, unknown, { type: typeof LOGOUT }> => {
  return (dispatch) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const authenticate = (
  userId: string,
  token: string,
  expiryTime: number,
): ThunkAction<void, RootState, unknown, AuthAction> => {
  return (dispatch) => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: AUTHENTICATE, userId: userId, token: token });
  };
};

// AsyncStorage saves token and id from auth response
const saveDataToStorage = (token: string, userId: string, expirationDate: Date) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({ token: token, userId: userId, expiryDate: expirationDate.toISOString() }),
  );
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

    //tmr autologout
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn, 10) * 1000));

    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000);

    //tmr autologin
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
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

    //tmr autologout
    dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn, 10) * 1000));

    const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn, 10) * 1000);

    //tmr autologout
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  };
};
