import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../Constant/Icons';
import { fontSize, goBack, hp, wp } from '../../Helpers/globalFunction';
import { fonts } from '../../Constant/Fonts';

function OnboardingHeader({
  isIcon,
  isSkip,
}: {
  isIcon?: boolean;
  isSkip?: boolean;
}): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.container} onPress={goBack}>
      {isIcon ? (
        <Image source={icons.back} style={styles.backButtonStyle} />
      ) : (
        <View />
      )}

      {isSkip ? (
        <TouchableOpacity style={styles.skipButtonStyle}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(1.23),
  },
  backButtonStyle: {
    height: wp(8),
    width: wp(8),
  },
  skipButtonStyle: {
    paddingVertical: wp(1.33),
    paddingHorizontal: wp(2.66),
  },
  skipText: {
    fontFamily: fonts.Bold,
    fontSize: fontSize(16),
  },
});

export default OnboardingHeader;
