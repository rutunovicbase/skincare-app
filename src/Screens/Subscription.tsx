import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import LinearButton from '../Components/common/LinearButton';

const plans = [
  {
    name: 'Basic',
    monthly: '199₹',
    yearly: '2399₹',
  },
  {
    name: 'Standard',
    monthly: '299₹',
    yearly: '4199₹',
  },
  {
    name: 'Premium',
    monthly: '499₹',
    yearly: '5999₹',
  },
];

function Subscription() {
  const { t } = useTranslation();

  const [selectedPlan, setSelectedPlan] = useState(0);
  const prevSelected = useRef(0);

  const animatedHeights = plans.map(() => useSharedValue(hp(12.31)));

  const handleSelect = useCallback(
    (index: number) => {
      if (index === selectedPlan) return;

      animatedHeights[prevSelected.current].value = withSpring(hp(12.31), {
        damping: 20,
        stiffness: 200,
      });

      animatedHeights[index].value = withSpring(hp(15.39), {
        damping: 20,
        stiffness: 200,
      });

      prevSelected.current = index;
      setSelectedPlan(index);
    },
    [animatedHeights, selectedPlan],
  );

  useEffect(() => {
    animatedHeights[selectedPlan].value = hp(15.39);
  }, []);

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

            <View style={styles.planContainer}>
              {plans.map((plan, index) => {
                const isSelected = selectedPlan === index;
                const animatedStyle = useAnimatedStyle(() => ({
                  height: animatedHeights[index].value,
                }));

                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    onPress={() => handleSelect(index)}
                  >
                    <Animated.View
                      style={[
                        styles.planView,
                        animatedStyle,
                        isSelected && styles.selectedPlanView,
                      ]}
                    >
                      {isSelected ? (
                        <View style={styles.planTitle}>
                          <Text style={styles.planTitleText}>{plan.name}</Text>
                        </View>
                      ) : (
                        <Text
                          style={[
                            styles.planTitleText,
                            { color: colors.subscriptionBlurText },
                          ]}
                        >
                          {plan.name}
                        </Text>
                      )}
                      <Text
                        style={[
                          styles.priceTextStyle,
                          {
                            marginTop: isSelected ? hp(1.35) : 0,
                            color: isSelected
                              ? colors.background
                              : colors.subscriptionBlurText,
                          },
                        ]}
                      >
                        {plan.monthly}/{' '}
                        <Text style={styles.timePeriodStyle}>monthly</Text>
                      </Text>
                      <Text style={styles.perYearPrice}>
                        {plan.yearly}/ yearly
                      </Text>
                    </Animated.View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.continueButtonContainer}>
            <View style={styles.infoContainer}>
              <Image
                source={icons.info}
                style={styles.infoIcon}
                tintColor={colors.subscriptionBlurText}
              />
              <Text style={styles.infoText}>Terms & conditions, policies.</Text>
            </View>
            <LinearButton
              title="Subscribe now"
              onPress={() => {}}
              style={styles.continueButton}
              textStyle={styles.continueButtonText}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: 'flex-end',
  },
  planView: {
    width: wp(26.66),
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: wp(4),
    backgroundColor: colors.blurBackground,
    padding: wp(1.33),
  },
  planTitle: {
    height: hp(3.32),
    borderRadius: wp(2.66),
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  planTitleText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.background,
    textAlign: 'center',
  },
  priceTextStyle: {
    textAlign: 'center',
    color: colors.background,
    fontSize: fontSize(25),
    fontFamily: fonts.Medium,
    marginBottom: hp(0.98),
  },
  timePeriodStyle: {
    fontSize: fontSize(16),
  },
  perYearPrice: {
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
    textAlign: 'center',
    color: colors.subscriptionBlurText,
    marginBottom: wp(1.33),
  },
  selectedPlanView: {
    borderColor: colors.background,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
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
  continueButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: wp(4.26),
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
    color: colors.subscriptionBlurText,
  },
});

export default Subscription;
