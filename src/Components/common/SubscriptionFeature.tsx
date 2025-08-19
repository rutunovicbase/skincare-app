import React from 'react';
import { Image, ImageProps, StyleSheet, Text, View } from 'react-native';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { colors } from '../../Constant/Colors';
import { fonts } from '../../Constant/Fonts';

type SubscriptionFeatureProps = {
  featureIcon: ImageProps['source'];
  featureTitle: string;
  isBlur?: boolean;
};

function SubscriptionFeature({
  featureIcon,
  featureTitle,
  isBlur,
}: SubscriptionFeatureProps) {
  return (
    <View style={styles.featureContainer}>
      <Image
        source={featureIcon}
        style={[styles.featureIcon, isBlur && styles.blurStyle]}
      />
      <Text style={[styles.featureTitle, isBlur && styles.blurStyle]}>
        {featureTitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  featureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.84),
  },
  featureIcon: {
    height: wp(6.66),
    width: wp(6.66),
    marginRight: wp(2.66),
  },
  featureTitle: {
    fontSize: fontSize(16),
    color: colors.blurCrown,
    fontFamily: fonts.Medium,
  },
  blurStyle: {
    opacity: 0.5,
    textDecorationLine: `line-through`,
  },
});

export default SubscriptionFeature;
