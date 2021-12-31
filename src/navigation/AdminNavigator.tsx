import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants';
import { UserProducts } from '../screens/UserProduct';
import { UserEditProduct } from '../screens/UserEditProduct';
import { UIIconButton } from '../components/UI/UIHeaderButton';
import pencil from '../assets/icons/pencil';
import check from '../assets/icons/check';

export type AdminStackParamList = {
  UserProducts: undefined;
  UserEditProduct: { productId?: string; submit: () => any };
};

const Admin = createNativeStackNavigator<AdminStackParamList>();

export const AdminNavigator = () => {
  return (
    <Admin.Navigator
      screenOptions={{
        headerTitle: 'Your Products',
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
          color: Colors.primary,
        },
        headerTintColor: Colors.primary,
      }}
    >
      <Admin.Screen
        name="UserProducts"
        component={UserProducts}
        options={({ navigation }) => ({
          headerRight: () => (
            <UIIconButton
              onPress={() => navigation.navigate('UserEditProduct')}
              icon={pencil({ color: Colors.primary })}
            />
          ),
        })}
      />
      <Admin.Screen
        name="UserEditProduct"
        component={UserEditProduct}
        options={({ route }) => ({
          headerTitle: route.params?.productId !== undefined ? 'Edit Product' : 'Add Product',
          headerRight: () => <UIIconButton onPress={route.params?.submit} icon={check({ color: Colors.primary })} />,
        })}
      />
    </Admin.Navigator>
  );
};
