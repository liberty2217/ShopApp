import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth } from '../screens/Auth';
import { Colors } from '../constants';

export type AuthStackParamList = {
  Auth: undefined;
};

const Authentification = createNativeStackNavigator<AuthStackParamList>();

export const AuthentificationNavigator = () => {
  return (
    <Authentification.Navigator
      screenOptions={{
        headerTitle: 'Authentication',
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
          color: Colors.primary,
        },
        headerTintColor: Colors.primary,
      }}
    >
      <Authentification.Screen name="Auth" component={Auth} />
    </Authentification.Navigator>
  );
};
