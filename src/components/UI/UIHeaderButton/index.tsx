import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { SvgXml } from 'react-native-svg';

type UIIconButton = {
  onPress?: () => any;
  icon: string;
};

export const UIIconButton: React.FC<UIIconButton> = (props) => {
  const { onPress, icon } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <SvgXml xml={icon} />
    </TouchableOpacity>
  );
};
