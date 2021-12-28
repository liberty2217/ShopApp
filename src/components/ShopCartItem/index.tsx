import React from 'react';

import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import trash from '../../assets/icons/trash';
import { Colors } from '../../constants';

import { styles as s } from './styles';

type ShopCartItemProps = {
  deletable?: boolean;
  quantity: number;
  title: string;
  amount: number;
  onRemove?: () => any;
};

export const ShopCartItem: React.FC<ShopCartItemProps> = (props) => {
  const { onRemove = () => null, title, quantity, amount, deletable = false } = props;

  return (
    <View style={s.cartItem}>
      <Text style={s.itemData}>
        <Text style={s.quantity}>{quantity} </Text>
        <Text style={s.mainText}>{title} </Text>
      </Text>
      <View style={s.itemData}>
        <Text style={s.mainText}>$ {amount.toFixed(2)}</Text>

        {deletable && (
          <TouchableOpacity style={s.deleteButton} onPress={onRemove}>
            <SvgXml xml={trash({ color: Colors.primary })} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
