import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import { Colors } from '../../constants';
import { ProductStackParamList } from '../../navigation/ProductsNavigator';
import { addToCart } from '../../store/actions/cart';
import { useAppDispatch, useAppSelector } from '../../store/app/rootReducer';
import { styles as s } from './styles';

type Props = NativeStackScreenProps<ProductStackParamList, 'ShopProductDetails'>;

export const ShopProductDetails: React.FC<Props> = (props) => {
  const { route } = props;
  const { productId } = route.params;

  const selectedProduct = useAppSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId),
  );

  const dispatch = useAppDispatch();
  if (selectedProduct === undefined) return null;

  return (
    <ScrollView>
      <Image style={s.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={s.actions}>
        <Button color={Colors.primary} title="Add to Cart" onPress={() => dispatch(addToCart(selectedProduct))} />
      </View>
      <Text style={s.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={s.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};
