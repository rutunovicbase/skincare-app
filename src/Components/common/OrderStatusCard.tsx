import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { colors } from '../../Constant/Colors';
import { icons } from '../../Constant/Icons';
import { fonts } from '../../Constant/Fonts';
import { OrderStatus } from '../../Constant/types';

export function OrderStatusCard({
  title,
  status,
  date,
  onPress,
}: OrderStatus): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.medicineDetailsContainer}>
        <Text style={styles.titleText} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.statusText}>{status}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      <Image source={icons.orderBox} style={styles.orderBoxIcon} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(5.06),
    paddingVertical: hp(1.84),
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(5.33),
    marginBottom: hp(1.84),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  orderBoxIcon: {
    height: wp(20),
    width: wp(20),
  },
  medicineDetailsContainer: {
    width: wp(60.8),
    paddingRight: wp(5.33),
  },
  titleText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    marginBottom: wp(1.06),
  },
  statusText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.secondaryPurple,
  },
  dateText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(12),
    color: colors.textRGBA,
  },
});
