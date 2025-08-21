import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../Constant/Colors';
import { wp, hp, fontSize } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import LinearButton from '../Components/common/LinearButton';
import { genders } from '../Constant/Constant';
import { useTranslation } from 'react-i18next';

type Props = {
  onContinue: () => void;
};

export default function SelectGender({ onContinue }: Props) {
  const [gender, setGender] = useState('');

  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('WhatIsYourPronoun')}</Text>

        <View style={styles.genderContainer}>
          {genders?.map(item => (
            <View style={styles.genderButtonContainer} key={item}>
              <TouchableOpacity
                key={item}
                style={[
                  styles.genderButton,
                  gender === item && styles.genderButtonActive,
                ]}
                onPress={() => setGender(item)}
              >
                <Image
                  source={icons[item]}
                  style={styles.genderIcon}
                  tintColor={
                    gender === item ? colors.secondaryPurple : colors.black
                  }
                />
              </TouchableOpacity>
              <Text style={styles.genderButtonText}>{t(item)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Image source={icons.info} style={styles.infoIcon} />
        <Text style={styles.infoText}>{t('YouCantChangeYourGender')}</Text>
      </View>

      <LinearButton
        title={t('Continue')}
        onPress={onContinue}
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: wp(4.26),
  },
  title: {
    fontSize: fontSize(22),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(5.17),
    paddingRight: wp(38.8),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.23),
  },
  infoIcon: {
    width: wp(6.66),
    height: wp(6.66),
    marginRight: wp(2),
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.textRGBA,
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
  genderButton: {
    height: wp(29.33),
    width: wp(29.33),
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderButtonText: {
    marginTop: hp(1.23),
    marginBottom: hp(3.69),
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  genderButtonContainer: {
    alignItems: 'center',
  },
  genderContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: wp(8.66),
    justifyContent: 'space-around',
  },
  genderIcon: {
    height: wp(12.26),
    width: wp(12.26),
  },
  genderButtonActive: {
    backgroundColor: colors.primary,
  },
});
