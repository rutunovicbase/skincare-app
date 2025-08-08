import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { fontSize, goBack, hp, wp } from '../Helpers/globalFunction';
import OnboardingHeader from '../Components/common/OnboardingHeader';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';

const LANGUAGES = [
  { label: 'English', code: 'en', icon: 'A' },
  { label: 'Hindi', code: 'hi', icon: 'अ' },
  { label: 'Gujarati', code: 'gu', icon: 'અ' },
];

function SelectLanguage(): React.JSX.Element {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingHeader isIcon />
      <View style={styles.mainContainer}>
        <Text style={styles.selectLanguageText}>
          Select the Language You’re Most Comfortable With
        </Text>
        <Text style={styles.subHeadingText}>
          Your app experience will be in this language.
        </Text>

        {LANGUAGES.map(lang => (
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
        <LinearButton
          title="Continue"
          onPress={() => goBack()}
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
    paddingHorizontal: wp(5.33),
  },
  mainContainer: {
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
    marginTop: hp(42.61),
    backgroundColor: colors.primary,
    height: hp(4.92),
    borderRadius: hp(4.92),
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.text,
  },
});

export default SelectLanguage;
