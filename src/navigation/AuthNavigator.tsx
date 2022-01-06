import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth } from '../screens/Auth';
import { Colors } from '../constants';

const Authentification = createNativeStackNavigator();

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
    </Authentification.Navigator>
  );
};
