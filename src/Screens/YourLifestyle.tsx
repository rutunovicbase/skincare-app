import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../Constant/Colors';
import { wp, hp, fontSize } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';
import { yourLifestyle } from '../Constant/Constant';
import { useTranslation } from 'react-i18next';

type Props = {
  onContinue: () => void;
};

export default function YourLifestyle({ onContinue }: Props) {
  const [selectedItems, setSelectedItems] = useState<string>('');

  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('YourLifestyle')}</Text>
        <Text style={styles.subTitle}>{t('TellUsAboutYourSleepRoutine')}</Text>
        {yourLifestyle?.map(item => (
          <TouchableOpacity
            style={[
              styles.lifestyleItemContainer,
              selectedItems === item.title &&
                styles.selectedLifestyleItemContainer,
            ]}
            key={item.key}
            onPress={() => {
              setSelectedItems(item.title);
            }}
          >
            <Text
              style={[
                styles.lifestyleItemText,
                selectedItems === item.title &&
                  styles.selectedLifestyleItemText,
              ]}
            >
              {t(item.title)}
            </Text>
          </TouchableOpacity>
        ))}
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
  mainContainer: {
    flex: 1,
    marginHorizontal: wp(5.33),
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSize(25),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(3.07),
    paddingRight: wp(19.2),
  },
  subTitle: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    marginBottom: hp(2.46),
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
  lifestyleItemContainer: {
    height: hp(4.92),
    paddingHorizontal: wp(4),
    borderWidth: wp(0.26),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    justifyContent: 'center',
    marginBottom: hp(1.23),
  },
  selectedLifestyleItemContainer: {
    backgroundColor: colors.primary,
  },
  selectedLifestyleItemText: {
    fontFamily: fonts.Semibold,
  },
  lifestyleItemText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
  },
});
