import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { fontSize, goBack, hp, wp } from '../Helpers/globalFunction';
import OnboardingHeader from '../Components/common/OnboardingHeader';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';
import { languages } from '../Constant/Constant';
import { setLanguage } from '../store/Slices/languageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTranslation } from 'react-i18next';

function SelectLanguage(): React.JSX.Element {
  const { language } = useSelector((state: RootState) => state.language);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    language || 'en',
  );
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
  };

  const onPressContinue = () => {
    dispatch(setLanguage(selectedLanguage));
    goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingHeader isIcon isPadding={false} />
      <View style={styles.mainContainer}>
        <Text style={styles.selectLanguageText}>{t('SelectLanguage')}</Text>
        <Text style={styles.subHeadingText}>{t('YourAppLanguage')}</Text>

        {languages?.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.languageButton,
              selectedLanguage === lang.code && styles.languageButtonSelected,
            ]}
            onPress={() => handleLanguageSelect(lang.code)}
          >
            <Text style={styles.buttonText}>{lang.label}</Text>
            <View style={styles.languageIconStyle}>
              <Text style={styles.iconsStyle}>{lang.icon}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <LinearButton
        title={t('Continue')}
        onPress={onPressContinue}
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: wp(5.33),
  },
  mainContainer: {
    flex: 1,
    marginTop: hp(7.02),
  },
  selectLanguageText: {
    fontSize: fontSize(25),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  subHeadingText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginTop: hp(1.5),
    marginBottom: hp(3.69),
  },
  languageButton: {
    height: hp(4.92),
    width: '100%',
    borderRadius: hp(4.92),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    borderWidth: wp(0.26),
    borderColor: colors.borderGray,
    flexDirection: 'row',
    marginBottom: hp(1.5),
  },
  languageButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  buttonText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    color: colors.text,
  },
  languageIconStyle: {
    height: wp(6.66),
    width: wp(6.66),
    borderWidth: wp(0.26),
    borderRadius: wp(6.66),
    borderColor: colors.borderGray,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  iconsStyle: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
  },
  continueButton: {
    backgroundColor: colors.primary,
    height: hp(4.92),
    borderRadius: hp(4.92),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.23),
  },
  continueButtonText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.text,
  },
});

export default SelectLanguage;
