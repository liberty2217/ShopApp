import React, { useEffect, useRef } from 'react';
import { useAppSelector } from '../store/app/rootReducer';
import { ShopNavigator } from './ShopNavigator';

// listen to autologout
export const NavigationContainer = () => {
  const navRef = useRef();
  const isAuth = useAppSelector((state) => !!state.auth.token);

  //   useEffect(() => {
  //     if (!isAuth) {
  //       navRef?.current.dispatch(NavigationActions.);
  //     }
  //   }, [isAuth]);
  return <ShopNavigator ref={navRef} />;
};
