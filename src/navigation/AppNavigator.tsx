import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from '../store/app/rootReducer';
import { ShopNavigator } from './ShopNavigator';
import { AuthentificationNavigator } from './AuthNavigator';
import { Startup } from '../screens/StartupScreen.tsx';

export const AppNavigator = () => {
  // listen to autologout
  const isAuth = useAppSelector((state) => !!state.auth.token);
  const didTryAutoLogin = useAppSelector((state) => state.auth.didTryAutoLogin);

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthentificationNavigator />}
      {!isAuth && !didTryAutoLogin && <Startup />}
    </NavigationContainer>
  );
};
