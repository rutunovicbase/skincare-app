import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

function LinearButton({
  title,
  onPress,
  style,
  textStyle,
}: {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
}): React.JSX.Element {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
}

export default LinearButton;
