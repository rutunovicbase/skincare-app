import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { colors } from '../../Constant/Colors';
import { icons } from '../../Constant/Icons';
import { fonts } from '../../Constant/Fonts';
import { MedicineDetails } from '../../Constant/types';

export function OrderCard({
  name,
  quantitiy,
  mrp,
  discount,
  dosage,
}: MedicineDetails): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.medicineDetailsContainer}>
        <Text style={styles.medicineName} numberOfLines={2}>
          {name} ({dosage})
        </Text>
        <Text style={styles.quantityText}>Quantity: {quantitiy}</Text>
        <Text style={styles.medicineName}>
          MRP {mrp}₹{' '}
          {discount && (
            <Text style={styles.discountText}>
              {'  '}-{discount}%off
            </Text>
          )}
        </Text>
      </View>
      <Image source={icons.orderBox} style={styles.orderBoxIcon} />
    </View>
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
  medicineName: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    marginBottom: hp(0.61),
  },
  quantityText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.secondaryPurple,
    marginBottom: hp(1.23),
  },
  discountText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(12),
    color: colors.cancelRed,
  },
});
