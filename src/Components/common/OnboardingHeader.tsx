import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { icons } from '../../Constant/Icons';
import { fontSize, goBack, hp, wp } from '../../Helpers/globalFunction';
import { fonts } from '../../Constant/Fonts';

function OnboardingHeader({
  isIcon,
  isSkip,
  isPadding = true,
}: {
  isIcon?: boolean;
  isSkip?: boolean;
  isPadding?: boolean;
}): React.JSX.Element {
  return (
    <View
      style={[
        styles.container,
        {
          paddingHorizontal: isPadding ? wp(5.33) : 0,
        },
      ]}
    >
      {isIcon ? (
        <TouchableOpacity onPress={goBack}>
          <Image source={icons.back} style={styles.backButtonStyle} />
        </TouchableOpacity>
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
    </View>
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
