import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth } from '../screens/Auth';
import { Colors } from '../constants';
import { Startup } from '../screens/StartupScreen.tsx';
import { ShopNavigator } from './ShopNavigator';

export type AuthStackParamList = {
  Auth: undefined;
};

const Authentification = createNativeStackNavigator<AuthStackParamList>();

export const AuthentificationNavigator = () => {
  return (
    <Authentification.Navigator
      screenOptions={{
        headerTitle: 'Authentification',
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
          color: Colors.primary,
        },
      }}
    >
      <Authentification.Screen name="Auth" component={Auth} />
      <Authentification.Screen name="Shop" component={ShopNavigator} />
    </Authentification.Navigator>
  );
};

// const MainNavigator = createNativeStackNavigator({
//   Startup: Startup,
//   Auth: AuthentificationNavigator,
//   Shop: ShopNavigator,
// });
