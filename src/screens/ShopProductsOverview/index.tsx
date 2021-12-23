import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { ShopProductItem } from '../../components/ShopProductItem';
import { ShopStackParamList } from '../../navigation/ShopNavigator';
import { RootState } from '../../store/app/rootReducer';

type Props = NativeStackScreenProps<ShopStackParamList, 'ShopProductsOverview'>;

export const ShopProductsOverview: React.FC<Props> = (props) => {
  const { navigation } = props;

  const products = useSelector((state: RootState) => state.products.availableProducts);

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ShopProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() =>
            navigation.navigate('ShopProductDetails', {
              productId: itemData.item.id,
              productTitle: itemData.item.title,
            })
          }
          onAddToCart={() => console.log('123')}
        />
      )}
    />
  );
};
