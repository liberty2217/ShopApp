import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Button, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { ShopProductItem } from '../../components/ShopProductItem';
import { Colors } from '../../constants';
import { Products } from '../../data/type';
import { AdminStackParamList } from '../../navigation/AdminNavigator';
import { deleteProduct } from '../../store/actions/products';
import { useAppSelector } from '../../store/app/rootReducer';

type Props = NativeStackScreenProps<AdminStackParamList, 'UserProducts'>;

export const UserProducts: React.FC<Props> = (props) => {
  const { navigation } = props;

  const userProducts = useAppSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  const deleteHandler = (id: Products['id']) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      { text: 'Yes', style: 'destructive', onPress: () => dispatch(deleteProduct(id)) },
    ]);
  };

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
          <Button color={Colors.primary} title="Delete" onPress={() => deleteHandler(itemData.item.id)} />
        </ShopProductItem>
      )}
    />
  );
};
