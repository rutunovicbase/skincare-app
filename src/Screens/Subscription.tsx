import React from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { icons } from '../Constant/Icons';
import { fontSize, goBack, hp, wp } from '../Helpers/globalFunction';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { useTranslation } from 'react-i18next';
import { fonts } from '../Constant/Fonts';
import SubscriptionFeature from '../Components/common/SubscriptionFeature';
import { BlurView } from '@react-native-community/blur';

function Subscription() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground style={styles.mainContainer} source={icons.background}>
        <SafeAreaView
          style={styles.container}
          edges={['left', 'right', 'bottom']}
        >
          <View style={styles.commonContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                style={styles.backButtonContainer}
                onPress={goBack}
              >
                <Image
                  source={icons.backArrows}
                  style={styles.backButtonIcon}
                  resizeMode="contain"
                  tintColor={colors.background}
                />
              </TouchableOpacity>

              <View style={styles.headerIconContainer}>
                <Image
                  source={icons.crownStar}
                  style={styles.crownIcon}
                  resizeMode="contain"
                  tintColor={colors.blurCrown}
                />
              </View>
            </View>

            <Text style={styles.subscriptionTitle}>
              {t('subscriptionTitle')}
            </Text>
            <Text style={styles.subscriptionSubTitle}>
              {t('subscriptionSubTitle')}
            </Text>

            <View style={styles.featureContainer}>
              <SubscriptionFeature
                featureIcon={icons.scanner}
                featureTitle={t('subFeature1')}
                isBlur
              />
              <SubscriptionFeature
                featureIcon={icons.reportIcon}
                featureTitle={t('subFeature2')}
              />
              <SubscriptionFeature
                featureIcon={icons.doctor}
                featureTitle={t('subFeature3')}
              />
              <SubscriptionFeature
                featureIcon={icons.booking}
                featureTitle={t('subFeature4')}
              />
              <SubscriptionFeature
                featureIcon={icons.moisturizer}
                featureTitle={t('subFeature5')}
              />
            </View>
            {/* <View style={styles.planContainer}>
              <View>
                <View style={styles.planTitle}>
                  <BlurView
                    blurAmount={15}
                    style={{ position: 'absolute' }}
                    blurType="light"
                  />
                  <Text style={styles.planTitleText}>Basic</Text>
                </View>

                <View style={styles.planView}></View>
              </View>
            </View> */}

            <View style={styles.planContainer}>
              <View>
                <View style={styles.planTitle}>
                  <BlurView
                    blurAmount={50}
                    blurType="light"
                    reducedTransparencyFallbackColor="rgba(255,255,255,0.2)"
                  />
                  <Text style={styles.planTitleText}>Basic</Text>
                </View>

                <View style={styles.planView}></View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  absolute: {
    ...StyleSheet.absoluteFillObject, // fills parent fully
    borderRadius: 8, // optional, match container rounding
  },
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
  backButtonIcon: {
    height: wp(3.5),
    width: wp(3.5),
    tintColor: colors.background,
  },
  commonContainer: {
    paddingHorizontal: wp(4.26),
    marginTop: hp(1.23) + (StatusBar.currentHeight ?? 0),
  },
  backButtonContainer: {
    height: wp(8),
    width: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: wp(4),
    overflow: 'hidden',
    backgroundColor: colors.blurBackground,
  },
  headerContainer: {
    flexDirection: 'row',
  },
  headerIconContainer: {
    height: wp(26.66),
    width: wp(26.66),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.blurBackground,
    borderRadius: wp(26.66),
    justifyContent: 'center',
    marginLeft: wp(23.46),
    backgroundColor: colors.blurBackground,
    overflow: 'hidden',
  },
  crownIcon: {
    height: wp(13.33),
    width: wp(13.33),
  },
  subscriptionTitle: {
    fontSize: fontSize(25),
    color: colors.background,
    marginTop: hp(2.46),
    fontFamily: fonts.Bold,
    paddingHorizontal: wp(15.73),
    textAlign: 'center',
  },
  subscriptionSubTitle: {
    fontSize: fontSize(14),
    color: colors.blurCrown,
    marginTop: hp(1.23),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
  },
  featureContainer: {
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: wp(8),
    paddingHorizontal: wp(4),
    paddingTop: wp(5.33),
    marginTop: hp(1.23),
    paddingBottom: hp(0.61),
    backgroundColor: colors.blurBackground,
    overflow: 'hidden',
    marginBottom: hp(4.31),
  },
  planContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planView: {
    height: wp(26.66),
    width: wp(26.66),
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: wp(4),
    backgroundColor: colors.blurBackground,
  },
  planTitle: {
    height: hp(3.32),
    borderRadius: wp(2.66),
    marginHorizontal: wp(2.66),
    top: hp(1.84),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  planTitleText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.background,
  },
});

export default Subscription;
