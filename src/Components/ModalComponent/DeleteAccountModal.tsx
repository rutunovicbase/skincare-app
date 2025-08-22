import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../../Constant/Colors';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { icons } from '../../Constant/Icons';
import { fonts } from '../../Constant/Fonts';

export function DeleteAccountModal({
  visible,
  onPressBack,
  onPressYes,
  onPressNo,
}: {
  visible: boolean;
  onPressBack: () => void;
  onPressYes: () => void;
  onPressNo: () => void;
}): React.JSX.Element {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onPressBack}
      onBackButtonPress={onPressBack}
      style={styles.modalStyle}
    >
      <View style={styles.mainContainer}>
        <View style={styles.stopIconMainContainer}>
          <View style={styles.stopIconContainer}>
            <Image source={icons.stop} style={styles.stopIcon} />
          </View>
        </View>
        <Text style={styles.areYousureText}>
          Are you sure you want to delete your account?
        </Text>
        <Text style={styles.deleteAccountDesc}>
          Deleting your account will permanently erase all your consultations,
          prescriptions, and scan reports.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.yesButtonContainer}
            activeOpacity={0.6}
            onPress={onPressYes}
          >
            <Text style={styles.yesText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.noButtonContainer}
            activeOpacity={0.6}
            onPress={onPressNo}
          >
            <Text style={styles.noText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    marginHorizontal: wp(10.66),
  },
  mainContainer: {
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(5.33),
    paddingVertical: hp(3.07),
    paddingHorizontal: wp(5.33),
    alignItems: 'center',
  },
  stopIconMainContainer: {
    height: hp(12.31),
    width: hp(12.31),
    backgroundColor: colors.primaryBorder,
    borderRadius: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopIconContainer: {
    height: hp(9.67),
    width: hp(9.67),
    backgroundColor: colors.secondaryPurple,
    borderRadius: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopIcon: {
    height: hp(6.15),
    width: hp(6.15),
  },
  areYousureText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
    marginTop: hp(1.84),
    marginBottom: hp(0.61),
  },
  deleteAccountDesc: {
    fontSize: fontSize(12),
    fontFamily: fonts.Regular,
    color: colors.textRGBA,
    textAlign: 'center',
    lineHeight: hp(1.97),
    marginBottom: hp(2.33),
  },
  buttonContainer: {
    height: hp(6.15),
    borderRadius: wp(100),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: wp(1.33),
    backgroundColor: colors.secondaryGray,
    width: '100%',
    elevation: 1,
  },
  yesButtonContainer: {
    height: '100%',
    width: wp(32),
    backgroundColor: colors.primary,
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesText: {
    color: colors.black,
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
  },
  noButtonContainer: {
    height: '100%',
    width: wp(32),
    backgroundColor: colors.black,
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  noText: {
    color: colors.background,
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
  },
});
