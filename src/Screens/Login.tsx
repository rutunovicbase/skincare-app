import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import Animated, {
  FadeInLeft,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearButton from '../Components/common/LinearButton';
import { useTranslation } from 'react-i18next';

function Login(): React.JSX.Element {
  const [isSignIn, setIsSignIn] = useState(true);
  const offset = useSharedValue<number>(wp(0));

  const { t } = useTranslation();

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const onPressSignup = () => {
    setIsSignIn(false);
    offset.value = withTiming(wp(32) + wp(2.66));
  };
  const onPressSignIn = () => {
    setIsSignIn(true);
    offset.value = withTiming(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.languageContainer}>
        <TouchableOpacity
          style={styles.languageSelector}
          onPress={() => {
            navigate('SelectLanguage');
          }}
        >
          <Image source={icons.uk} style={styles.languageIcon} />
          <Text style={styles.languageText}>En</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <Animated.View
          style={styles.headingTextAnimationView}
          entering={FadeInLeft.duration(800)}
        >
          <Text style={styles.headingText}>
            {isSignIn ? t('Welcome') : t('Get started now')}
          </Text>
          <Text style={styles.subHeadingText}>
            {isSignIn ? t('SignInToAccess') : t('CreateNewAccount')}
          </Text>
        </Animated.View>

        <View style={styles.authButtonWrapper}>
          <View style={styles.authButtonContainer}>
            <Animated.View style={[styles.authButton, animatedStyles]} />
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={onPressSignIn}
            >
              <Text
                style={[
                  styles.authButtonText,
                  isSignIn && styles.activeAuthButtonText,
                ]}
              >
                {t('SignIn')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={onPressSignup}
            >
              <Text
                style={[
                  styles.authButtonText,
                  !isSignIn && styles.activeAuthButtonText,
                ]}
              >
                {t('SignUp')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mobileNoView}>
          <Text style={styles.mobileNoText}>{t('MobileNo')}</Text>
          <TextInput
            style={styles.mobileNoInput}
            placeholder="0000000000"
            placeholderTextColor={colors.textRGBA}
          />
        </View>
        <LinearButton
          title={isSignIn ? t('SignIn') : t('SignUp')}
          onPress={() => {
            navigate('OTPVerification');
          }}
          style={styles.signInButtonStyle}
          textStyle={styles.signInButtonTextStyle}
        />
        <View style={styles.dividerView}>
          <View style={styles.dividerLine} />
          <Text style={styles.orTextStyle}>{t('OrLoginWith')}</Text>
          <View style={styles.dividerLine} />
        </View>
        <TouchableOpacity style={styles.loginWithGoogleButton}>
          <Image source={icons.google} style={styles.googleIconStyle} />
          <Text style={styles.loginWithGoogleText}>
            {t('ContinueWithGoogle')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginWithAppleButton}>
          <Image source={icons.apple} style={styles.googleIconStyle} />
          <Text style={styles.loginWithGoogleText}>
            {t('ContinueWithApple')}
          </Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.dontHaveAccountText}>
            {isSignIn ? t('DontHaveAccount') : t('AlreadyHaveAccount')}
          </Text>
          <TouchableOpacity style={styles.signUpButtonStyle}>
            <Text style={styles.signUpText}>
              {isSignIn ? t('SignUp') : t('SignIn')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: wp(5.06),
  },
  languageContainer: {
    alignItems: 'flex-end',
    marginRight: wp(1.6),
    marginTop: hp(1.23),
    marginBottom: hp(13.54),
  },
  languageSelector: {
    backgroundColor: colors.secondaryGray,
    paddingHorizontal: wp(2.66),
    paddingVertical: hp(0.61),
    width: wp(18.66),
    borderRadius: hp(3.7),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.borderGray,
    borderWidth: wp(0.08),
  },
  languageText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
  },
  languageIcon: {
    height: wp(5.33),
    width: wp(5.33),
    marginRight: wp(2.93),
  },
  contentContainer: {
    alignItems: 'center',
  },
  headingText: {
    fontFamily: fonts.Bold,
    fontSize: fontSize(32),
    marginBottom: hp(1.23),
    color: colors.text,
  },
  subHeadingText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    color: colors.textRGBA,
    marginBottom: hp(2.46),
  },
  authButtonWrapper: {
    backgroundColor: colors.secondaryGray,
    height: hp(6.15),
    marginHorizontal: wp(10.26),
    width: wp(69.33),
    borderRadius: hp(6.15),
    padding: wp(1.33),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2.46),
  },
  authButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    borderRadius: hp(6.15),
    justifyContent: 'space-between',
  },
  authButton: {
    width: wp(32),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: colors.primary,
    height: '100%',
    borderRadius: hp(6.15),
  },
  authButtonActive: {
    backgroundColor: colors.primary,
    borderRadius: hp(6.15),
  },
  authButtonText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
    color: colors.text,
  },
  authButtonTextActive: {
    color: colors.background,
  },
  buttonStyle: {
    width: wp(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingTextAnimationView: {
    alignItems: 'center',
  },
  mobileNoText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
    color: colors.text,
    marginBottom: hp(1.23),
  },
  mobileNoView: {
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: hp(2.46),
  },
  mobileNoInput: {
    borderWidth: wp(0.26),
    borderColor: colors.borderGray,
    width: '100%',
    height: hp(4.93),
    borderRadius: hp(4.93),
    lineHeight: 0,
    paddingVertical: 0,
    fontFamily: fonts.Medium,
    fontSize: fontSize(12),
    paddingHorizontal: wp(4.92),
  },
  signInButtonStyle: {
    width: '100%',
    height: hp(4.93),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(4.93),
    marginBottom: hp(2.46),
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  signInButtonTextStyle: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.text,
  },
  dividerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: hp(2.46),
  },
  dividerLine: {
    height: hp(0.12),
    backgroundColor: colors.dividerColor,
    width: wp(31.46),
  },
  orTextStyle: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(12),
    color: colors.lightText,
  },
  loginWithGoogleButton: {
    width: '100%',
    height: hp(4.93),
    backgroundColor: colors.secondaryGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(4.93),
    marginBottom: hp(2.46),
    borderWidth: wp(0.08),
    borderColor: colors.borderGray,
    flexDirection: 'row',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  loginWithAppleButton: {
    width: '100%',
    height: hp(4.93),
    backgroundColor: colors.secondaryGray,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(4.93),
    marginBottom: hp(14.03),
    borderWidth: wp(0.08),
    borderColor: colors.borderGray,
    flexDirection: 'row',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  loginWithGoogleText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.black,
    marginLeft: wp(5.33),
  },
  googleIconStyle: {
    width: wp(5.33),
    height: wp(5.33),
  },
  signUpText: {
    fontFamily: fonts.Bold,
    fontSize: fontSize(14),
    color: colors.text,
  },
  dontHaveAccountText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    color: colors.text,
    textAlign: 'center',
  },
  signUpButtonStyle: {
    marginLeft: wp(1.6),
  },
  footerContainer: {
    flexDirection: 'row',
  },
  activeAuthButtonText: {
    fontFamily: fonts.Semibold,
  },
});

export default Login;
