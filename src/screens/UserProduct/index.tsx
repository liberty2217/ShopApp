import React from 'react';
import { Button, FlatList } from 'react-native';
import { ShopProductItem } from '../../components/ShopProductItem';
import { Colors } from '../../constants';
import { useAppSelector } from '../../store/app/rootReducer';

export const UserProducts = () => {
  const userProducts = useAppSelector((state) => state.products.userProducts);
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ShopProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => null}
        >
          <Button color={Colors.primary} title="Edit" onPress={() => null} />
          <Button color={Colors.primary} title="Delete" onPress={() => null} />
        </ShopProductItem>
      )}
    />
  );
};
