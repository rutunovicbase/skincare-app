import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { colors } from '../../Constant/Colors';
import { fonts } from '../../Constant/Fonts';
import { icons } from '../../Constant/Icons';

export function DeliverByCard(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.deliverByText}>Deliver by</Text>
      <TouchableOpacity style={styles.dateContainer}>
        <Image source={icons.calendar} style={styles.calendarStyle} />
        <Text style={styles.dateText}>Mon, 12 Aug 2025</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp(4),
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(5.33),
    elevation: 2,
  },
  deliverByText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    marginBottom: hp(1.84),
  },
  dateContainer: {
    paddingVertical: hp(0.61),
    backgroundColor: colors.secondaryPurple,
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  calendarStyle: {
    height: hp(3.07),
    width: hp(3.07),
  },
  dateText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(14),
    color: colors.background,
    marginLeft: wp(1.33),
  },
});
