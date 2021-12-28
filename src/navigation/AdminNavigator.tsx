import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants';
import { UserProducts } from '../screens/UserProduct';

const Admin = createNativeStackNavigator();

export const AdminNavigator = () => {
  return (
    <Admin.Navigator
      screenOptions={{
        headerTitle: 'Your Products',
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
          color: Colors.primary,
        },
      }}
    >
      <Admin.Screen name="UserProduct" component={UserProducts} />
    </Admin.Navigator>
  );
};
