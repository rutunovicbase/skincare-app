import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { Header } from '../Components/common/Header';
import { OrderCard } from '../Components/common/OrderCard';
import { BillingDetails } from '../Components/common/BillingDetails';
import { DeliverByCard } from '../Components/common/DeliverByCard';
import LinearButton from '../Components/common/LinearButton';

export default function OrderPreview() {
  const onPressCancelOrder = () => {
    navigate('CancelOrder');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Order details" isPadding />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdText}>Order ID</Text>
          <Text style={styles.orderId}>OD-123456789456123</Text>
        </View>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdText}>Order placed date</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.commonTextStyle}>10</Text>
            <Text style={styles.commonTextStyle}>|</Text>
            <Text style={styles.commonTextStyle}>Aug</Text>
            <Text style={styles.commonTextStyle}>|</Text>
            <Text style={styles.commonTextStyle}>2025</Text>
          </View>
        </View>
        <View style={styles.orderIdContainer}>
          <OrderCard
            name="Gentle cleanser (non-foaming, pH balanced)"
            mrp={299}
            quantitiy="1 (10 Tablets)"
            discount={10}
          />
          <OrderCard
            name="Topical anti-acne cream 150ml"
            mrp={299}
            quantitiy="1"
            discount={10}
          />
          <OrderCard
            name="Zinc tablets (once daily, after food) "
            mrp={299}
            quantitiy="1 (10 Tablets)"
            discount={10}
          />
          <OrderCard
            name="Sunscreen SPF 30+ (broad-spectrum, oil-free) 150ml"
            mrp={299}
            quantitiy="1"
            discount={10}
          />
        </View>
        <Text style={styles.billingDetailsText}>Billing details</Text>
        <BillingDetails total={1196} discount={150} delivery={99} taxes={215} />
        <View style={styles.orderIdContainer}>
          <DeliverByCard />
        </View>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdText}>Payment method</Text>
          <Text style={styles.paymentMethodText}>UPI app</Text>
        </View>
        <View style={styles.orderIdContainer}>
          <Text style={styles.orderIdText}>Shipping address</Text>
          <View style={styles.addressContainer}>
            <Text style={styles.addressType}>Home</Text>
            <Text style={styles.addressText}>
              D-101, abc complex, abc circle , adajan surat. 395005
            </Text>
          </View>
        </View>
        <LinearButton
          title="Cancel order"
          style={styles.cancelButton}
          textStyle={styles.cancelButtonText}
          onPress={onPressCancelOrder}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: wp(4.26),
  },
  orderIdContainer: {
    marginTop: hp(3.07),
  },
  orderIdText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    marginBottom: hp(1.23),
  },
  orderId: {
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
    borderWidth: wp(0.23),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: wp(0.23),
    borderRadius: wp(100),
    borderColor: colors.borderGray,
    paddingVertical: hp(1.23),
    backgroundColor: colors.secondaryGray,
  },
  commonTextStyle: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.textRGBA,
  },
  billingDetailsText: {
    marginTop: hp(1.23),
    fontFamily: fonts.Semibold,
    fontSize: fontSize(22),
    marginBottom: hp(1.84),
  },
  paymentMethodText: {
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
    borderWidth: wp(0.23),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    color: colors.textRGBA,
  },
  addressText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
    lineHeight: fontSize(20),
  },
  addressContainer: {
    marginBottom: hp(3.07),
    padding: wp(4),
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(5.33),
    elevation: 3,
  },
  addressType: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    lineHeight: fontSize(20),
  },
  cancelButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
});
