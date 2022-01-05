import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActivityIndicator, Button, FlatList, View } from 'react-native';

import { ShopProductItem } from '../../components/ShopProductItem';
import { Colors } from '../../constants';
import { Products } from '../../data/type';
import { ProductStackParamList } from '../../navigation/ProductsNavigator';
import { addToCart } from '../../store/actions/cart';
import { useAppDispatch, useAppSelector } from '../../store/app/rootReducer';
import { fetchProducts } from '../../store/actions/products';
import { styles as s } from './styles';

type Props = NativeStackScreenProps<ProductStackParamList, 'ShopProductsOverview'>;

export const ShopProductsOverview: React.FC<Props> = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      await dispatch(fetchProducts());
      setIsLoading(false);
    };
    loadProducts();
  }, [dispatch]);

  const products = useAppSelector((state) => state.products.availableProducts);

  const selectItemHandler = (id: Products['id'], title: Products['title']) => {
    navigation.navigate('ShopProductDetails', {
      productId: id,
      productTitle: title,
    });
  };

  if (isLoading) {
    return (
      <View style={s.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ShopProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => selectItemHandler(itemData.item.id, itemData.item.title)}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => selectItemHandler(itemData.item.id, itemData.item.title)}
          />
          <Button color={Colors.primary} title="To Cart" onPress={() => dispatch(addToCart(itemData.item))} />
        </ShopProductItem>
      )}
    />
  );
};
