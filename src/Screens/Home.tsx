import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../Constant/Colors';

function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Text>Home Screen</Text>
    </View>
  );
}

export default Home;
