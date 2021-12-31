import React from 'react';
import { Text, View, Button } from 'react-native';
import { Colors } from '../../constants';
import { TransformedCartItems } from '../../store/actions/orders';

import { ShopCartItem } from '../ShopCartItem';
import { Card } from '../UI/Card';
import { styles as s } from './styles';

type ShopOrderItemProps = {
  amount: number;
  date: string;
  items: TransformedCartItems[];
};

export const ShopOrderItem: React.FC<ShopOrderItemProps> = (props) => {
  const { amount, date, items } = props;

  const [showDetails, setShowDetails] = React.useState(false);

  return (
    <Card style={s.orderItem}>
      <View style={s.summary}>
        <Text style={s.totalAmount}>$ {amount.toFixed(2)}</Text>
        <Text style={s.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? 'Hide Details' : 'Show Details'}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={s.detailItems}>
          {items.map((cartItem, index) => (
            <ShopCartItem
              key={index}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};
