import React, { useEffect, useState, useCallback } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';

import { ShopProductItem } from '../../components/ShopProductItem';
import { Colors } from '../../constants';
import { Products } from '../../data/type';
import { ProductStackParamList } from '../../navigation/ProductsNavigator';
import { addToCart } from '../../store/actions/cart';
import { useAppDispatch, useAppSelector } from '../../store/app/rootReducer';
import { fetchProducts } from '../../store/actions/products';
import { styles as s } from './styles';
import { ErrorCallback } from 'typescript';

type Props = NativeStackScreenProps<ProductStackParamList, 'ShopProductsOverview'>;

export const ShopProductsOverview: React.FC<Props> = (props) => {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useAppDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (err: any) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    const focusSubscription = navigation.addListener('focus', loadProducts);

    return focusSubscription;
  });
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const products = useAppSelector((state) => state.products.availableProducts);

  const selectItemHandler = (id: Products['id'], title: Products['title']) => {
    navigation.navigate('ShopProductDetails', {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={s.centered}>
        <Text>Error occured</Text>
        <Button title="Try again" onPress={loadProducts} color={Colors.primary} />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={s.centered}>
        <ActivityIndicator color={Colors.primary} size="large" />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={s.centered}>
        <Text>No products found. Maybe start adding some!</Text>
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
