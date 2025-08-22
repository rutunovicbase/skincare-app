import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontSize, goBack, hp, wp } from '../../Helpers/globalFunction';
import { icons } from '../../Constant/Icons';
import { fonts } from '../../Constant/Fonts';

export function Header({
  title,
  isPadding,
}: {
  title?: string;
  isPadding: boolean;
}) {
  const padding = isPadding ? wp(4.26) : 0;
  return (
    <View style={[styles.headerContainer, { paddingHorizontal: padding }]}>
      <TouchableOpacity onPress={goBack}>
        <Image source={icons.back} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.backIcon} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: hp(1.23),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIcon: {
    height: wp(8),
    width: wp(8),
  },
  headerTitle: {
    fontSize: fontSize(22),
    fontFamily: fonts.Semibold,
  },
});
