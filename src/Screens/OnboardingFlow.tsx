import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Keyboard } from 'react-native';
import OnboardingHeader from '../Components/common/OnboardingHeader';
import ProgressBar from '../Components/common/ProgressBar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { wp, hp, navigate } from '../Helpers/globalFunction';
import { colors } from '../Constant/Colors';
import EnterName from './EnterName';
import SelectGender from './SelectGender';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';
import Birthdate from './Birthdate';
import YourLifestyle from './YourLifestyle';
import DietaryPreferences from './DietaryPreferences';
import YourStressLevel from './YourStressLevel';

const { width } = Dimensions.get('window');

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const translateX = useSharedValue(-currentStep * width);

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      Keyboard.dismiss();
      setCurrentStep(prev => prev + 1);

      translateX.value = withTiming(-(currentStep + 1) * width);
    } else {
      navigate('AddPhoto');
    }
  };

  const steps = [
    <EnterName onContinue={goToNextStep} />,
    <SelectGender onContinue={goToNextStep} />,
    <Birthdate onContinue={goToNextStep} />,
    <YourLifestyle onContinue={goToNextStep} />,
    <DietaryPreferences onContinue={goToNextStep} />,
    <YourStressLevel onContinue={goToNextStep} />,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingHeader isIcon={true} isSkip={false} />
      <View style={styles.progressContainer}>
        <ProgressBar currentStep={currentStep + 1} />
      </View>

      <Animated.View
        style={[styles.stepsContainer, { transform: [{ translateX }] }]}
      >
        {steps.map((step, index) => (
          <View key={index} style={{ width }}>
            {step}
          </View>
        ))}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressContainer: {
    marginTop: hp(2.58),
    marginBottom: hp(3.07),
    paddingHorizontal: wp(5.33),
  },
  stepsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
});
