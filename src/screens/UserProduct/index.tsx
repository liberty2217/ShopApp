import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { ShopProductItem } from '../../components/ShopProductItem';
import { Colors } from '../../constants';
import { AdminStackParamList } from '../../navigation/AdminNavigator';
import { deleteProduct } from '../../store/actions/products';
import { useAppSelector } from '../../store/app/rootReducer';

type Props = NativeStackScreenProps<AdminStackParamList, 'UserProducts'>;

export const UserProducts: React.FC<Props> = (props) => {
  const { navigation } = props;

  const userProducts = useAppSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ShopProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => navigation.navigate('UserEditProduct', { productId: itemData.item.id })}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => navigation.navigate('UserEditProduct', { productId: itemData.item.id })}
          />
          <Button color={Colors.primary} title="Delete" onPress={() => dispatch(deleteProduct(itemData.item.id))} />
        </ShopProductItem>
      )}
    />
  );
};
