import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert, Button, FlatList, View, Text } from 'react-native';
import { ShopProductItem } from '../../components/ShopProductItem';
import { Colors } from '../../constants';
import { Products } from '../../data/type';
import { AdminStackParamList } from '../../navigation/AdminNavigator';
import { deleteProduct } from '../../store/actions/products';
import { useAppDispatch, useAppSelector } from '../../store/app/rootReducer';
import { style as s } from './styles';

type Props = NativeStackScreenProps<AdminStackParamList, 'UserProducts'>;

export const UserProducts: React.FC<Props> = (props) => {
  const { navigation } = props;

  const userProducts = useAppSelector((state) => state.products.userProducts);

  const dispatch = useAppDispatch();

  const deleteHandler = (id: Products['id']) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      { text: 'Yes', style: 'destructive', onPress: () => dispatch(deleteProduct(id)) },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={s.center}>
        <Text>No products found, maybe start creating some</Text>
      </View>
    );
  }

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
