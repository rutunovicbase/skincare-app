import React, { useEffect, useState } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import firestore from '@react-native-firebase/firestore';

export default function OrderReview(): React.JSX.Element {
  const [grandTotal, setGrandTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState<any | null>(null);
  const user = useSelector((s: RootState) => s.auth.user);
  const orderData = useSelector((s: RootState) => s.order.data);
  const orderSelectedAddress = useSelector(
    (s: RootState) => s.order.selectedAddress,
  );
  useEffect(() => {
    if (orderSelectedAddress) {
      setSelectedAddress(orderSelectedAddress);
      return;
    }

    if (!user?.uid) return;
    const unsub = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(snap => {
        const d = snap.data() as any;
        const list = Array.isArray(d?.addresses) ? d.addresses : [];
        setSelectedAddress(list.length ? list[0] : null);
      });
    return () => unsub();
  }, [user?.uid, orderSelectedAddress]);

  const onPressAddAddress = () => {
    navigate('Address', { selectMode: true });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Order review" isPadding />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.deliverToText}>Deliver to</Text>
          <Text style={styles.addressText}>
            {selectedAddress
              ? `${selectedAddress.line1}, ${selectedAddress.street}${
                  selectedAddress.landmark
                    ? `, ${selectedAddress.landmark}`
                    : ''
                }, ${selectedAddress.city}, ${selectedAddress.state}. ${
                  selectedAddress.pincode
                }`
              : 'No address selected'}
          </Text>
          <Text style={[styles.addressText, styles.mobileNoText]}>
            {selectedAddress ? `mob no ${selectedAddress.receiverPhone}` : ''}
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
        <BillingDetails
          total={orderData?.totalPrice ?? 0}
          discount={15}
          delivery={99}
          taxes={45}
          grandTotal={grandTotal}
          setGrandTotal={setGrandTotal}
        />
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
    color: colors.text,
  },
  addressText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
    color: colors.text,
  },
  addAddressText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
    color: colors.text,
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
    color: colors.text,
  },
  paymentTitle: {
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
    marginBottom: hp(1.23),
    color: colors.text,
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
    color: colors.text,
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
    color: colors.text,
  },
});
