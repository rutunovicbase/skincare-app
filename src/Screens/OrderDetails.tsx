import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../Components/common/Header';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { OrderCard } from '../Components/common/OrderCard';
import { fonts } from '../Constant/Fonts';
import { BillingDetails } from '../Components/common/BillingDetails';
import LinearButton from '../Components/common/LinearButton';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import moment from 'moment';

export default function OrderDetails(): React.JSX.Element {
  const data = useSelector((s: RootState) => s.order.data);
  console.log('🚀 ~ OrderDetails ~ data:', data);
  const [grandTotal, setGrandTotal] = useState(0);
  const user = useSelector((s: RootState) => s.auth.user);

  const onPressProceed = async () => {
    try {
      if (!user?.uid) return;

      const ordersRef = firestore().collection('orders');

      const orderPayload: any = {
        userId: user.uid,
        items: data?.medications || [],
        total: grandTotal ?? 0,
        status: 'processing',
        createdAt: moment().toISOString(),
        userName: `${user?.firstName ?? ''} ${user?.lastName ?? ''}`.trim(),
        paymentStatus: 'pending',
      };

      const docRef = await ordersRef.add(orderPayload);
      await docRef.update({ orderId: docRef.id });

      navigate('OrderReview');
    } catch (err) {
      console.warn('Failed to create order', err);
      navigate('OrderReview');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Order details" isPadding />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          {data?.medications?.map((item, index) => (
            <OrderCard
              key={index}
              name={item.medication}
              dosage={item.dosage}
              mrp={item.price}
            />
          ))}

          <Text style={styles.billingDetailsText}>Billing details</Text>
          <BillingDetails
            total={data?.totalPrice ?? 0}
            discount={15}
            delivery={99}
            taxes={45}
            grandTotal={grandTotal}
            setGrandTotal={setGrandTotal}
          />

          <View style={styles.continueButtonContainer}>
            <LinearButton
              title="Proceed"
              onPress={onPressProceed}
              style={styles.continueButton}
              textStyle={styles.continueButtonText}
            />
          </View>
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
  contentContainer: {
    marginTop: hp(3.07),
  },
  billingDetailsText: {
    marginTop: hp(1.23),
    fontFamily: fonts.Semibold,
    fontSize: fontSize(22),
    marginBottom: hp(1.84),
  },
  continueButtonContainer: {
    marginTop: hp(3.07),
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
