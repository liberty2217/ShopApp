import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../constants';
import { UserProducts } from '../screens/UserProduct';
import { UserEditProduct } from '../screens/UserEditProduct';
import { UIIconButton } from '../components/UI/UIHeaderButton';
import pencil from '../assets/icons/pencil';
import check from '../assets/icons/check';
import logoutBtn from '../assets/icons/logoutBtn';
import { logout } from '../store/actions/auth';
import { useDispatch } from 'react-redux';

export type AdminStackParamList = {
  UserProducts: undefined;
  UserEditProduct: { productId?: string; submit?: () => Promise<void> };
};

const Admin = createNativeStackNavigator<AdminStackParamList>();

export const AdminNavigator = () => {
  const dispatch = useDispatch();

  return (
    <Admin.Navigator
      screenOptions={{
        headerTitle: 'Edit Products',
        headerTitleStyle: {
          fontFamily: 'OpenSans-Bold',
          color: Colors.primary,
        },
        headerTintColor: Colors.primary,
      }}
    >
      <Admin.Screen
        name="User Products"
        component={UserProducts}
        options={({ navigation }) => ({
          headerTitle: 'User Products',
          headerRight: () => {
            return (
              <UIIconButton
                onPress={() => {
                  dispatch(logout());
                }}
                icon={logoutBtn({ color: Colors.primary })}
              />
            );
          },
          headerLeft: () => (
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
