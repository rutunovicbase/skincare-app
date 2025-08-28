import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../Components/common/Header';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { OrderCard } from '../Components/common/OrderCard';
import { fonts } from '../Constant/Fonts';
import { BillingDetails } from '../Components/common/BillingDetails';
import LinearButton from '../Components/common/LinearButton';

export default function OrderDetails(): React.JSX.Element {
  const onPressProceed = () => {
    navigate('OrderReview');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Order details" isPadding />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.contentContainer}>
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
          <Text style={styles.billingDetailsText}>Billing details</Text>
          <BillingDetails
            total={1196}
            discount={150}
            delivery={99}
            taxes={215}
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
