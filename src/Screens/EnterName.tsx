import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { wp, hp, fontSize, navigate } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import OnboardingHeader from '../Components/common/OnboardingHeader';
import ProgressBar from '../Components/common/ProgressBar';
import LinearButton from '../Components/common/LinearButton';
import { icons } from '../Constant/Icons';

function EnterName(): React.JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const currentStep = 1;

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingHeader isIcon={true} isSkip={false} />
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={currentStep} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>May I know your name?</Text>

        <Text style={styles.inputLabel}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your First name"
          placeholderTextColor={colors.lightText}
          value={firstName}
          onChangeText={setFirstName}
          autoFocus={true}
        />
        <Text style={styles.inputLabel}>Last name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Last name"
          placeholderTextColor={colors.lightText}
          value={lastName}
          onChangeText={setLastName}
          autoFocus={true}
        />
      </View>
      <View style={styles.infoContainer}>
        <Image source={icons.info} style={styles.infoIcon} />
        <Text style={styles.infoText}>
          You can't change your name after this.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <LinearButton
          title="Continue"
          onPress={() => {
            navigate('SelectGender');
          }}
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
  progressContainer: {
    marginTop: hp(2.58),
    marginBottom: hp(2.7),
  },
  progressText: {
    fontSize: fontSize(14),
    color: colors.lightText,
    textAlign: 'center',
    marginTop: hp(1),
    fontFamily: fonts.Regular,
  },
  content: {
    flex: 1,
    paddingTop: hp(2),
  },
  title: {
    fontSize: fontSize(25),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginRight: wp(36.8),
    marginBottom: hp(2.46),
  },
  inputContainer: {
    marginTop: hp(2),
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
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    justifyContent: 'center',
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  buttonContainer: {
    marginBottom: hp(2.46),
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
});

export default EnterName;
