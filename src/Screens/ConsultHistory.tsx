import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fontSize, hp, wp } from '../Helpers/globalFunction';
import { icons } from '../Constant/Icons';
import { colors } from '../Constant/Colors';
import { fonts } from '../Constant/Fonts';

export default function ConsultHistory() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.iconContainer}>
        <View style={styles.iconBox}>
          <Image
            source={icons.info}
            style={styles.iconStyle}
            tintColor={colors.background}
          />
        </View>
      </View>
      <Text style={styles.noDataText}>
        You don’t have any active consultations right now.
      </Text>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: hp(3.07),
    paddingHorizontal: wp(5.33),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: wp(37.33),
    width: wp(37.33),
    backgroundColor: colors.primaryBorder,
    borderRadius: wp(37.33),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2.46),
  },
  iconBox: {
    height: wp(29.33),
    width: wp(29.33),
    backgroundColor: colors.secondaryPurple,
    borderRadius: wp(29.33),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: wp(13.33),
    width: wp(13.33),
  },
  noDataText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
    color: colors.textRGBA,
    paddingHorizontal: wp(16.26),
  },
});
