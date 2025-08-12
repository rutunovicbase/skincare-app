import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import OnboardingHeader from '../Components/common/OnboardingHeader';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { ONBOARDING_DATA } from '../Constant/Constant';
import { useTranslation } from 'react-i18next';

export default function Onboarding(): React.JSX.Element {
  const [step, setStep] = useState<number>(0);
  const progress = useSharedValue(0);

  const { t } = useTranslation();

  useAnimatedReaction(
    () => {
      const value = progress?.value ? Math.round(progress?.value) : 0;
      return value;
    },
    (result, prev) => {
      if (result !== prev) {
        runOnJS(setStep)(result);
      }
    },
    [],
  );

  const handleNext = () => {
    if (progress.value < ONBOARDING_DATA?.length - 1) {
      progress.value = withTiming(progress.value + 1, { duration: 400 });
    } else {
      navigate('OnboardingFlow');
    }
  };

  const handleBack = () => {
    if (progress.value > 0) {
      progress.value = withTiming(progress.value - 1, { duration: 400 });
    }
  };

  const amoebaStyle = useAnimatedStyle(() => {
    const rotation = interpolate(
      progress.value,
      [0, 1, 2],
      [0, 55, 75.54],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{ rotate: `${rotation}deg` }],
    };
  });

  const animatedTextStyles = ONBOARDING_DATA?.map((_, index) =>
    useAnimatedStyle(() => {
      const isActive = Math.round(progress.value) === index;
      return {
        opacity: withTiming(isActive ? 1 : 0, { duration: 400 }),
        transform: [
          {
            translateY: withTiming(isActive ? 0 : 10, { duration: 400 }),
          },
        ],
        position: 'absolute',
      };
    }),
  );

  const renderDots = () => (
    <View style={styles.paginationContainer}>
      {ONBOARDING_DATA?.map((_, index) => {
        const activeWidth = wp(6.66);
        const inactiveWidth = wp(2.66);
        const dotStyle = useAnimatedStyle(() => {
          return {
            width: withTiming(
              progress.value === index ? activeWidth : inactiveWidth,
              {
                duration: 300,
              },
            ),
            backgroundColor: colors.primary,
          };
        });
        return <Animated.View key={index} style={[styles.dot, dotStyle]} />;
      })}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingHeader isIcon={false} isSkip={true} isPadding={false} />
      <View style={styles.mainContainer}>
        <View style={styles.imageContainer}>
          <Animated.View style={[styles.imageWrapper, amoebaStyle]}>
            <Image
              source={icons.amoeba}
              style={styles.amoebaImageStyle}
              resizeMode="contain"
            />
          </Animated.View>

          {ONBOARDING_DATA?.map((item, index) => {
            const animatedStyle = useAnimatedStyle(() => {
              const isActive = Math.round(progress.value) === index;
              return {
                opacity: withTiming(isActive ? 1 : 0, { duration: 400 }),
                transform: [
                  {
                    translateY: withTiming(isActive ? 0 : 20, {
                      duration: 400,
                    }),
                  },
                ],
                position: 'absolute',
              };
            });

            return (
              <Animated.Image
                key={item.key}
                source={item.image}
                style={[styles.frameImage, animatedStyle]}
                resizeMode="contain"
              />
            );
          })}
        </View>

        {ONBOARDING_DATA?.map((item, index) => (
          <Animated.View
            key={item.key}
            style={[{ top: hp(60.96) }, animatedTextStyles[index]]}
          >
            <Text style={styles.headingText}>{t(item.titleKey)}</Text>
            <Text style={styles.subHeadingText}>{t(item.descriptionKey)}</Text>
          </Animated.View>
        ))}
        <View style={styles.footerContainer}>
          {renderDots()}

          <View style={styles.nextButtonContainer}>
            {step && step > 0 ? (
              <TouchableOpacity
                style={styles.backButtonStyle}
                onPress={handleBack}
              >
                <Image
                  source={icons.back}
                  style={styles.backButtonIconStyle}
                  resizeMode="contain"
                />
                <Text style={styles.nextButtonTextStyle}>{t('Back')}</Text>
              </TouchableOpacity>
            ) : (
              <View />
            )}
            <TouchableOpacity
              style={styles.nextButtonStyle}
              onPress={handleNext}
            >
              <Text style={styles.nextButtonTextStyle}>{t('Next')}</Text>
              <Image
                source={icons.back}
                style={styles.nextButtonIconStyle}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
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
    flex: 1,
  },
  imageContainer: {
    height: hp(48.02),
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'absolute',
  },
  amoebaImageStyle: {
    width: wp(84.23),
    height: hp(36.08),
  },
  frameImage: {
    width: wp(77.86),
    height: hp(45.93),
    marginTop: hp(2.09),
  },
  headingText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(32),
    paddingRight: wp(16),
    color: colors.dividerColor,
  },
  subHeadingText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    marginTop: hp(1.23),
    marginBottom: hp(4.43),
    color: colors.dividerColor,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(4.06),
  },
  dot: {
    height: wp(2.66),
    borderRadius: hp(2.66),
    marginHorizontal: wp(1.33),
  },
  nextButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButtonStyle: {
    paddingHorizontal: wp(2.66),
    paddingVertical: hp(0.61),
    backgroundColor: colors.primary,
    borderRadius: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  backButtonStyle: {
    paddingHorizontal: wp(2.66),
    paddingVertical: hp(0.61),
    backgroundColor: colors.secondaryGray,
    borderRadius: hp(4),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp(2),
  },
  nextButtonTextStyle: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.text,
  },
  nextButtonIconStyle: {
    width: wp(6.66),
    height: wp(6.66),
    marginLeft: wp(1.86),
    transform: [{ rotate: '180deg' }],
  },
  backButtonIconStyle: {
    width: wp(6.66),
    height: wp(6.66),
    marginRight: wp(1.86),
  },
  footerContainer: {
    position: 'absolute',
    top: hp(77.7),
    width: '100%',
  },
});
