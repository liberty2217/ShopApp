import { Dispatch } from 'react';

export const SIGNUP = 'SIGNUP';

export const signup = (email, password) => {
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

    console.log(response);

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({ type: SIGNUP });
  };
};
