import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { colors } from '../../Constant/Colors';
import { fonts } from '../../Constant/Fonts';
import { BillingProps } from '../../Constant/types';

export function BillingDetails({
  total,
  discount,
  taxes,
  delivery,
  grandTotal,
  setGrandTotal,
}: BillingProps): React.JSX.Element {
  useEffect(() => {
    const calculated = total - discount + taxes + delivery;
    if (setGrandTotal) {
      setGrandTotal(calculated);
    }
  }, [total, discount, taxes, delivery, setGrandTotal]);

  return (
    <View style={styles.container}>
      <View style={styles.commonField}>
        <Text style={styles.fieldName}>Total</Text>
        <Text style={styles.fieldName}>{total}₹</Text>
      </View>
      <View style={styles.commonField}>
        <Text style={styles.fieldName}>Discount</Text>
        <Text style={styles.discountedPrice}>-{discount}₹</Text>
      </View>
      <View style={styles.commonField}>
        <Text style={styles.fieldName}>Taxes and charges</Text>
        <Text style={styles.fieldName}>{taxes}₹</Text>
      </View>
      <View style={styles.commonField}>
        <Text style={styles.fieldName}>Delivery charges</Text>
        <Text style={styles.fieldName}>{delivery}₹</Text>
      </View>
      <View style={styles.borderStyle} />
      <View style={[styles.grandTotalField, styles.commonField]}>
        <Text style={styles.fieldName}>Grand Total</Text>
        <Text style={styles.fieldName}>{grandTotal}₹</Text>
      </View>
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
  commonField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(0.61),
  },
  fieldName: {
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
  },
  discountedPrice: {
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
    color: colors.cancelRed,
  },
  borderStyle: {
    height: wp(0.53),
    backgroundColor: colors.black,
    marginTop: hp(1.23),
  },
  grandTotalField: {
    marginTop: hp(1.84),
  },
});
