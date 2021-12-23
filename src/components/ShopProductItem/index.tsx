import React from 'react';
import { Image, View, Text, Button, TouchableNativeFeedback, Platform, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants';
import { styles as s } from './styles';

type ShopProductItem = {
  image: string;
  title: string;
  price: number;
  onViewDetail: () => void;
  onAddToCart: () => null;
};

export const ShopProductItem: React.FC<ShopProductItem> = (props) => {
  const { image, title, price, onViewDetail, onAddToCart } = props;

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={s.product}>
      <View style={s.touchable}>
        <TouchableCmp onPress={onViewDetail} useForeground>
          <View>
            <View style={s.imageContainer}>
              <Image style={s.image} source={{ uri: image }} />
            </View>
            <View style={s.details}>
              <Text style={s.title}>{title}</Text>
              <Text style={s.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={s.actions}>
              <Button color={Colors.primary} title="View Details" onPress={onViewDetail} />
              <Button color={Colors.primary} title="To Cart" onPress={onAddToCart} />
            </View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};
