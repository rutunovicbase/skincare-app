import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../Components/common/Header';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors } from '../Constant/Colors';
import { fontSize, hp, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import LinearButton from '../Components/common/LinearButton';

export default function ManageSubscription(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Manage Subscription" isPadding />
      <View style={styles.mainContainer}>
        <Text style={styles.yourPlanText}>Your plan</Text>

        <View style={styles.crownContainer}>
          <Image source={icons.subscriptionCrown} style={styles.crownStyle} />
        </View>
        <Text style={styles.planNameText}>Basic care membership</Text>
        <Text style={styles.periodText}>Monthly subscription</Text>
        <View style={styles.planDetailsContainer}>
          <Text style={styles.billingDetailsText}>Billing Details</Text>
          <View style={styles.commonField}>
            <Text style={styles.commonFont}>Billing price</Text>
            <Text style={styles.commonFont}>199₹</Text>
          </View>
          <View style={styles.commonField}>
            <Text style={styles.commonFont}>Starting date</Text>
            <Text style={styles.commonFont}>Mon, 12 Aug 2025</Text>
          </View>
          <View style={styles.commonField}>
            <Text style={styles.commonFont}>Next billing date</Text>
            <Text style={styles.commonFont}>Mon, 12 Sept 2025</Text>
          </View>
        </View>
        <Text style={styles.noteStyle}>
          You’ll be charged 199₹ automatically from your bank account on mon, 12
          Sept 2025
        </Text>
      </View>
      <View style={styles.continueButtonContainer}>
        <LinearButton
          title="Cancel subscription"
          onPress={() => {}}
          style={styles.continueButton}
          textStyle={styles.continueButtonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    marginTop: hp(1.84),
    paddingHorizontal: wp(4.26),
  },
  yourPlanText: {
    fontSize: fontSize(18),
    fontFamily: fonts.Semibold,
  },
  crownContainer: {
    height: wp(20),
    width: wp(20),
    borderRadius: wp(20),
    backgroundColor: colors.secondaryGray,
    alignSelf: 'center',
    marginTop: hp(1.23),
    marginBottom: hp(1.84),
    justifyContent: 'center',
    alignItems: 'center',
  },
  crownStyle: {
    height: wp(12),
    width: wp(12),
  },
  planNameText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    textAlign: 'center',
  },
  periodText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(12),
    textAlign: 'center',
    color: colors.borderGray,
    marginBottom: hp(3.69),
  },
  planDetailsContainer: {
    backgroundColor: colors.secondaryGray,
    paddingHorizontal: wp(4),
    paddingTop: wp(4),
    borderRadius: wp(5.33),
    marginBottom: hp(1.84),
  },
  billingDetailsText: {
    fontSize: fontSize(18),
    fontFamily: fonts.Semibold,
    marginBottom: hp(1.84),
  },
  commonField: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(4),
  },
  commonFont: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(15),
  },
  noteStyle: {
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
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
  continueButtonContainer: {
    flex: 1,
    paddingHorizontal: wp(4.26),
    justifyContent: 'flex-end',
  },
});
