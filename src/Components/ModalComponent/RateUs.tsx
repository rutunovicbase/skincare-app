import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from '../../Constant/Colors';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { icons } from '../../Constant/Icons';
import { fonts } from '../../Constant/Fonts';

export function RateUs({
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
  const [rating, setRating] = useState(0);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          activeOpacity={0.7}
          onPress={() => setRating(i)}
        >
          <Image
            source={i <= rating ? icons.starFilled : icons.starOutline}
            style={styles.starIcon}
          />
        </TouchableOpacity>,
      );
    }
    return <View style={styles.starsContainer}>{stars}</View>;
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onPressBack}
      onBackButtonPress={onPressBack}
      style={styles.modalStyle}
    >
      <View style={styles.mainContainer}>
        {renderStars()}
        <Text style={styles.lovingAppText}>Loving the app?</Text>
        <Text style={styles.rateUsDesc}>
          Rate us to help improve your experience!
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.yesButtonContainer}
            activeOpacity={0.6}
            onPress={onPressYes}
          >
            <Text style={styles.yesText}>Rate us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.noButtonContainer}
            activeOpacity={0.6}
            onPress={onPressNo}
          >
            <Text style={styles.noText}>No thanks</Text>
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
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(5.3),
  },
  starIcon: {
    height: hp(4),
    width: hp(4),
    marginHorizontal: wp(1),
    resizeMode: 'contain',
  },
  lovingAppText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
    marginTop: hp(3.44),
    marginBottom: hp(1.23),
    color: colors.text,
  },
  rateUsDesc: {
    fontSize: fontSize(12),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
    lineHeight: hp(1.97),
    marginBottom: hp(2.33),
    color: colors.text,
  },
  buttonContainer: {
    height: hp(6.15),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: wp(1.33),
    width: '100%',
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
