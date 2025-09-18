import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { colors } from '../Constant/Colors';
import { wp, hp, fontSize } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import LinearButton from '../Components/common/LinearButton';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

type Props = {
  onContinue: () => void;
};

export default function EnterName({ onContinue }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onPressContinue = async () => {
    if (firstName && lastName) {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          await firestore().collection('users').doc(currentUser.uid).set(
            {
              firstName,
              lastName,
            },
            { merge: true },
          );
        }
      } catch (e) {}
      onContinue();
    }
  };

  const { t } = useTranslation();
  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('YourName')}</Text>

        <Text style={styles.inputLabel}>{t('FirstName')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('EnterYourFirstName')}
          placeholderTextColor={colors.lightText}
          value={firstName}
          onChangeText={setFirstName}
          autoFocus
        />

        <Text style={styles.inputLabel}>{t('LastName')}</Text>
        <TextInput
          style={styles.input}
          placeholder={t('EnterYourLastName')}
          placeholderTextColor={colors.lightText}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.infoContainer}>
        <Image source={icons.info} style={styles.infoIcon} />
        <Text style={styles.infoText}>{t('YouCantChangeYourName')}</Text>
      </View>

      <LinearButton
        title={t('Continue')}
        onPress={onPressContinue}
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
    marginBottom: hp(2.46),
    paddingRight: wp(36.8),
  },
  input: {
    borderWidth: 1,
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.6),
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
    color: colors.textRGBA,
    marginBottom: hp(2.46),
  },
  inputLabel: {
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    color: colors.text,
    marginBottom: hp(1.23),
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
});
