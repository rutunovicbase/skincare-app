import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { colors } from '../../Constant/Colors';
import { fonts } from '../../Constant/Fonts';
import { fontSize, wp } from '../../Helpers/globalFunction';

interface ProgressBarProps {
  currentStep: number; // 1-6
  totalSteps?: number;
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  borderRadius?: number;
  duration?: number;
  showStepNumbers?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps = 6,
  height = wp(2.13),
  backgroundColor = colors.secondaryGray,
  progressColor = colors.primary,
  borderRadius = 999,
  duration = 500,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    const progressValue =
      Math.max(0, Math.min(currentStep, totalSteps)) / totalSteps;
    progress.value = withTiming(progressValue, { duration });
  }, [currentStep, totalSteps, duration, progress]);

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      progress.value,
      [0, 1],
      [0, 100],
      Extrapolate.CLAMP,
    );

    return {
      width: `${width}%`,
    };
  });

  const renderStepCircles = () => {
    return (
      <View style={[styles.circlesContainer, { top: -wp(1.6) }]}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <View key={stepNumber} style={styles.circleWrapper}>
              <View
                style={[
                  styles.stepCircle,
                  {
                    backgroundColor:
                      isCompleted || isCurrent
                        ? progressColor
                        : colors.secondaryGray,
                    borderColor:
                      isCompleted || isCurrent
                        ? progressColor
                        : backgroundColor,
                  },
                ]}
              >
                {currentStep === stepNumber && (
                  <Text style={styles.stepNumberText}>{stepNumber}</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.progressBarContainer]}>
        <View
          style={[
            styles.container,
            {
              height,
              borderRadius,
              backgroundColor,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.progress,
              {
                backgroundColor: progressColor,
                borderRadius,
              },
              animatedStyle,
            ]}
          />
        </View>
        {renderStepCircles()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
  },
  progressBarContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
  circlesContainer: {
    position: 'absolute',
    left: wp(9.6),
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircle: {
    width: wp(5.33),
    height: wp(5.33),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    zIndex: 2,
  },
  stepNumberText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
    color: colors.black,
  },
});

export default ProgressBar;
