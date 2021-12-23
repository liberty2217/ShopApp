import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Image, ScrollView, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { ShopStackParamList } from '../../navigation/ShopNavigator';
import { RootState } from '../../store/app/rootReducer';

type Props = NativeStackScreenProps<ShopStackParamList, 'ShopProductDetails'>;

export const ShopProductDetails: React.FC<Props> = (props) => {
  const { route } = props;
  const { productId } = route.params;

  const selectedProduct = useSelector((state: RootState) =>
    state.products.availableProducts.find((prod) => prod.id === productId),
  );

  if (!selectedProduct) return null;

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};
