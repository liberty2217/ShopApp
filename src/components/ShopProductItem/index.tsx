import React from 'react';
import { Image, View, Text, TouchableNativeFeedback, Platform, TouchableOpacity } from 'react-native';
import { styles as s } from './styles';

type ShopProductItem = {
  image: string;
  title: string;
  price: number;
  onSelect: () => any;
};

export const ShopProductItem: React.FC<ShopProductItem> = (props) => {
  const { image, title, price, onSelect, children } = props;

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={s.product}>
      <View style={s.touchable}>
        <TouchableCmp onPress={onSelect} useForeground>
          <View>
            <View style={s.imageContainer}>
              <Image style={s.image} source={{ uri: image }} />
            </View>
            <View style={s.details}>
              <Text style={s.title}>{title}</Text>
              <Text style={s.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={s.actions}>{children}</View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};
