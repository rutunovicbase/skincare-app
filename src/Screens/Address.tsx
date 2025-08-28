import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { Header } from '../Components/common/Header';
import LinearButton from '../Components/common/LinearButton';
import { fontSize, hp, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { AddressCard } from '../Components/common/AddressCard';

export default function Address(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Address" isPadding />
      <View style={styles.mainContainer}>
        <LinearButton
          title="Add new address"
          style={styles.addAddressButton}
          textStyle={styles.addAddressButtonText}
          onPress={() => {}}
        />
        <View style={styles.orContainer}>
          <View style={styles.dividerStyle} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.dividerStyle} />
        </View>
        <Text style={styles.chooseFromSaveText}>Choose From saved Address</Text>
        <AddressCard
          type="Home"
          address={'D-101, abc complex, abc circle , adajan surat. 395005'}
        />
        <AddressCard
          type="Office"
          address={'D-101, abc complex, abc circle , adajan surat. 395005'}
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
    flex: 1,
    paddingHorizontal: wp(4.26),
  },
  addAddressButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
    marginTop: hp(3.07),
  },
  addAddressButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.23),
  },
  dividerStyle: {
    flex: 1,
    height: wp(0.23),
    backgroundColor: colors.subheadingText,
  },
  orText: {
    marginHorizontal: wp(4.26),
    fontFamily: fonts.Regular,
    fontSize: fontSize(12),
    color: colors.lightText,
    lineHeight: fontSize(16),
  },
  chooseFromSaveText: {
    fontSize: fontSize(18),
    fontFamily: fonts.Semibold,
    marginBottom: hp(1.84),
  },
});
