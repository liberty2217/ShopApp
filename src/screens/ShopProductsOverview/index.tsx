import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import { ShopProductItem } from '../../components/ShopProductItem';
import { Colors } from '../../constants';
import { Products } from '../../data/type';
import { ProductStackParamList } from '../../navigation/ProductsNavigator';
import { addToCart } from '../../store/actions/cart';
import { useAppSelector } from '../../store/app/rootReducer';

type Props = NativeStackScreenProps<ProductStackParamList, 'ShopProductsOverview'>;

export const ShopProductsOverview: React.FC<Props> = (props) => {
  const { navigation } = props;

  const products = useAppSelector((state) => state.products.availableProducts);

  const selectItemHandler = (id: Products['id'], title: Products['title']) => {
    navigation.navigate('ShopProductDetails', {
      productId: id,
      productTitle: title,
    });
  };

  const dispatch = useDispatch();

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
