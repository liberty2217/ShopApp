import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { styles as s } from './styles';

type CardProps = {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
};
export const Card: React.FC<CardProps> = (props) => {
  const { style, children } = props;
  return <View style={[s.card, style]}>{children}</View>;
};
