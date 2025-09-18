import React, { useState } from 'react';
import OnboardingHeader from '../Components/common/OnboardingHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../Constant/Colors';
import { fontSize, hp, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import { OtpInput } from 'react-native-otp-entry';
import LinearButton from '../Components/common/LinearButton';
import { useTranslation } from 'react-i18next';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../Constant/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import { useDispatch } from 'react-redux';
import { setAuthenticatedUser, setIsNewUser } from '../store/Slices/authSlice';
import { AppDispatch } from '../store/store';
import navigateAfterAuth from '../Helpers/navigateAfterAuth';

type OTPVerificationRouteProp = RouteProp<
  RootStackParamList,
  'OTPVerification'
>;
type OTPVerificationNavProp = NativeStackNavigationProp<
  RootStackParamList,
  'OTPVerification'
>;

type Props = {
  route: OTPVerificationRouteProp;
  navigation: OTPVerificationNavProp;
};

function OTPVerification({ route, navigation }: Props): React.JSX.Element {
  const { t } = useTranslation();

  const { confirmation } = route.params;
  const [code, setCode] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleConfirmCode = async () => {
    try {
      const result = await confirmation.confirm(code);

      if (result?.user) {
        const user = result.user;
        console.log('🚀 ~ handleConfirmCode ~ user:', user);

        await firestore()
          .collection('users')
          .doc(user.uid)
          .set(
            {
              uid: user.uid,
              email: user.email ?? null,
              providerId: 'phone',
              phoneNumber: user?.phoneNumber ?? null,
            },
            { merge: true },
          );

        dispatch(
          setAuthenticatedUser({
            uid: user.uid,
            email: user.email ?? null,
            emailVerified: !!user.emailVerified,
            providerId: 'phone',
            phoneNumber: user?.phoneNumber ?? null,
          }),
        );

        dispatch(setIsNewUser(!!result?.additionalUserInfo?.isNewUser));

        await navigateAfterAuth(
          dispatch as any,
          navigation as any,
          user.uid,
          !!result?.additionalUserInfo?.isNewUser,
        );
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingHeader isIcon />
      <View style={styles.mainContainer}>
        <Text style={styles.verificationText}>{t('Verification')}</Text>
        <View style={styles.iconContainer}>
          <View style={styles.iconBox}>
            <Image source={icons.OTPVerification} style={styles.iconStyle} />
          </View>
        </View>
        <Text style={styles.enterCodeText}>{t('enterCode')}</Text>
        <Text style={styles.enterCodeTextInfo}>{t('enterCodeInfo')}</Text>
        <OtpInput
          numberOfDigits={6}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
          onTextChange={setCode}
        />
        <View style={styles.didNotGetOtpContainer}>
          <Text style={styles.didntGetOtpText}>{t('DontReceiveOtp')}</Text>
          <TouchableOpacity style={styles.signUpButtonStyle}>
            <Text style={styles.resendText}>{t('Resend')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.confirmButtonContainer}>
          <LinearButton
            title={t('Confirm')}
            style={styles.confirmButton}
            textStyle={styles.confirmTextStyle}
            onPress={() => {
              handleConfirmCode();
            }}
          />
        </View>
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
    marginTop: hp(4.31),
    alignItems: 'center',
  },
  verificationText: {
    fontFamily: fonts.Bold,
    fontSize: fontSize(32),
    marginBottom: hp(6.65),
  },
  iconContainer: {
    height: wp(37.33),
    width: wp(37.33),
    backgroundColor: colors.primaryBorder,
    borderRadius: wp(37.33),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2.46),
  },
  iconBox: {
    height: wp(29.33),
    width: wp(29.33),
    backgroundColor: colors.secondaryPurple,
    borderRadius: wp(29.33),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: wp(13.33),
    width: wp(13.33),
  },
  enterCodeText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
  },
  enterCodeTextInfo: {
    marginHorizontal: wp(13.33),
    fontFamily: fonts.Medium,
    fontSize: fontSize(12),
    color: colors.subheadingText,
    textAlign: 'center',
  },
  otpContainer: {
    marginTop: hp(2.46),
    paddingHorizontal: wp(4.26),
    marginBottom: hp(2.46),
  },
  pinCodeContainer: {
    height: wp(12.8),
    width: wp(12.8),
    borderRadius: wp(12.8),
    borderColor: colors.primary,
    borderWidth: wp(0.26),
  },
  pinCodeText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    color: colors.black,
  },
  focusStick: {
    height: hp(1.72),
    backgroundColor: colors.primary,
  },
  activePinCodeContainer: {
    borderColor: colors.primary,
    borderWidth: wp(0.26),
  },
  didntGetOtpText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    color: colors.text,
    textAlign: 'center',
  },
  signUpButtonStyle: {
    marginLeft: wp(1.6),
  },
  didNotGetOtpContainer: {
    flexDirection: 'row',
    marginBottom: hp(5.05),
  },
  resendText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    color: colors.resendText,
  },
  confirmButton: {
    height: hp(4.93),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(4.93),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  confirmTextStyle: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.text,
  },
  confirmButtonContainer: {
    width: '100%',
    paddingHorizontal: wp(4.26),
  },
});

export default OTPVerification;
