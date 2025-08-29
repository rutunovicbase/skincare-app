import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { OrderStatusCard } from '../Components/common/OrderStatusCard';

export default function Orders() {
  const onPressOrder = () => {
    navigate('OrderPreview');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My orders</Text>
      <ScrollView style={styles.mainContainer}>
        <OrderStatusCard
          title="Prescription by Dr. Naira Jaswal"
          status="Arriving on"
          date="Mon, 12 aug 2025"
          onPress={onPressOrder}
        />
        <OrderStatusCard
          title="Prescription by Dr. Naira Jaswal"
          status="Delivered"
          onPress={onPressOrder}
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
  title: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(22),
    textAlign: 'center',
    marginTop: hp(1.23),
    marginBottom: hp(3.07),
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: wp(4.26),
  },
});
