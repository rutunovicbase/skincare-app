import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../Components/common/Header';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';
import { DeliverByCard } from '../Components/common/DeliverByCard';
import { BillingDetails } from '../Components/common/BillingDetails';

export default function OrderReview(): React.JSX.Element {
  const onPressAddAddress = () => {
    navigate('Address');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Order review" isPadding />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.deliverToText}>Deliver to</Text>
          <Text style={styles.addressText}>
            D-101, abc complex, abc circle , adajan surat. 395005
          </Text>
          <Text style={[styles.addressText, styles.mobileNoText]}>
            mob no +91 0000000000
          </Text>
          <LinearButton
            title="Add address"
            style={styles.addAddressButton}
            textStyle={styles.addAddressText}
            onPress={onPressAddAddress}
          />
        </View>
        <DeliverByCard />
        <Text style={styles.billingDetailsText}>Billing details</Text>
        <BillingDetails total={1196} discount={150} delivery={99} taxes={215} />
        <Text style={styles.billingDetailsText}>Pick a Payment Method</Text>
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentTitle}>UPI App</Text>
          <TouchableOpacity style={styles.paymentMethodOptionContainer}>
            <Text style={styles.paymentName}>Pay by UPI app</Text>
            <View style={styles.radioButtonContainer}>
              <View style={styles.selectedMethodView} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentTitle}>Credit, Debit, ATM card</Text>
          <TouchableOpacity style={styles.paymentMethodOptionContainer}>
            <Text style={styles.paymentName}>Add a new card</Text>
            <View style={styles.radioButtonContainer}>
              <View style={styles.selectedMethodView} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.paymentMethod}>
          <Text style={styles.paymentTitle}>Cash on Delivery</Text>
          <TouchableOpacity style={styles.paymentMethodOptionContainer}>
            <Text style={styles.paymentName}>Pay at your door step</Text>
            <View style={styles.radioButtonContainer}>
              <View style={styles.selectedMethodView} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.footerContainer}>
          <LinearButton
            title="Proceed"
            style={styles.continueButton}
            textStyle={styles.continueButtonText}
            onPress={() => {}}
          />
        </View>
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
    paddingHorizontal: wp(4.26),
  },
  addressContainer: {
    marginVertical: hp(3.07),
    padding: wp(4),
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(5.33),
    elevation: 3,
  },
  deliverToText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    marginBottom: hp(1.84),
  },
  addressText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
  },
  addAddressText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
  },
  addAddressButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
  },
  mobileNoText: {
    marginBottom: hp(1.84),
  },
  billingDetailsText: {
    marginTop: hp(3.07),
    fontFamily: fonts.Semibold,
    fontSize: fontSize(22),
    marginBottom: hp(1.84),
  },
  paymentTitle: {
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
    marginBottom: hp(1.23),
  },
  paymentMethodOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    borderWidth: wp(0.23),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    paddingVertical: hp(0.98),
  },
  paymentMethod: {
    marginBottom: hp(1.84),
  },
  radioButtonContainer: {
    height: hp(3.07),
    width: hp(3.07),
    borderRadius: hp(3.07),
    borderColor: colors.borderGray,
    borderWidth: wp(0.23),
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMethodView: {
    height: wp(4),
    width: wp(4),
    borderRadius: wp(5.33),
    backgroundColor: colors.primary,
  },
  paymentName: {
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
  },
  footerContainer: {
    marginTop: hp(6.15),
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
});
