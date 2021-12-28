import React from 'react';
import { FlatList } from 'react-native';
import { ShopProductItem } from '../../components/ShopProductItem';
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
          onViewDetail={() => null}
          onAddToCart={() => null}
        />
      )}
    />
  );
};
