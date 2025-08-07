import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { icons } from '../../Constant/Icons';
import { goBack, hp, wp } from '../../Helpers/globalFunction';

function OnboardingHeader(): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.container} onPress={goBack}>
      <Image source={icons.back} style={styles.backButtonStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1.23),
  },
  backButtonStyle: {
    height: wp(8),
    width: wp(8),
  },
});

export default OnboardingHeader;
