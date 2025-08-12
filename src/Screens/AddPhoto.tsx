import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../Constant/Colors';
import { wp, hp, fontSize } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import LinearButton from '../Components/common/LinearButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../Components/common/OnboardingHeader';
import { useTranslation } from 'react-i18next';

export default function AddPhoto() {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <OnboardingHeader
        isIcon
        title={t('JustOneMoreTap')}
        titleStyle={styles.title}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{t('AddYourProfilePicture')}</Text>
        <Text style={styles.subTitle}>{t('CaptureOrUploadPhoto')}</Text>
        <View style={styles.imageContainer}>
          <Image source={icons.user} style={styles.userImageStyle} />
        </View>
        <View style={styles.uploadImageContainer}>
          <TouchableOpacity style={styles.imageOptionContainer}>
            <View style={styles.cameraContainer}>
              <Image source={icons.camera} style={styles.cameraIcon} />
            </View>
            <Text style={styles.imageOptionText}>{t('Camera')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.imageOptionContainer}>
            <View style={styles.cameraContainer}>
              <Image source={icons.gallery} style={styles.galleryIcon} />
            </View>
            <Text style={styles.imageOptionText}>{t('Gallery')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LinearButton
        title={t('Continue')}
        onPress={() => {}}
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: wp(5.33),
    marginTop: hp(7.78),
  },
  mainContainer: {
    flex: 1,
  },
  title: {
    fontSize: fontSize(25),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  subTitle: {
    fontFamily: fonts.Bold,
    fontSize: fontSize(16),
    marginTop: hp(2.46),
    paddingRight: wp(18.66),
    marginBottom: hp(7.38),
  },
  imageContainer: {
    backgroundColor: colors.primaryBorder,
    height: wp(40),
    width: wp(40),
    borderRadius: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: hp(10.22),
  },
  userImageStyle: {
    height: wp(32),
    width: wp(32),
    borderRadius: wp(32),
  },
  uploadImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cameraContainer: {
    height: hp(8),
    width: hp(8),
    borderWidth: wp(0.26),
    borderRadius: hp(1.23),
    marginBottom: hp(0.86),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryGray,
    borderColor: colors.blackBorder,
  },
  cameraIcon: {
    height: wp(8.26),
    width: wp(9.33),
  },
  galleryIcon: {
    height: wp(10.66),
    width: wp(10.66),
  },
  imageOptionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageOptionText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    color: colors.black,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
    marginHorizontal: wp(5.33),
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
});
