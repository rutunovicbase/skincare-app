import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { Header } from '../Components/common/Header';
import LinearButton from '../Components/common/LinearButton';
import { commonAction, fontSize, hp, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';

type RootStackParamList = {
  Success?: { title: string; subTitle: string };
};

type SuccessRouteProp = RouteProp<RootStackParamList, 'Success'>;

type Props = {
  route: SuccessRouteProp;
};

export default function Success({ route }: Props): React.JSX.Element {
  const { title, subTitle } = route.params ?? { title: '', subTitle: '' };

  const handleOnContinue = () => {
    commonAction('MainTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header isPadding title="" />
      <View style={styles.content}>
        <Image source={icons.success} style={styles.successIcon} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subTitle}</Text>
      </View>

      <LinearButton
        title="Continue"
        onPress={handleOnContinue}
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(14.66),
    marginTop: hp(3.07),
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize(22),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(2.21),
    paddingHorizontal: wp(5.33),
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
    marginHorizontal: wp(4.26),
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  successIcon: {
    height: wp(37.33),
    width: wp(37.33),
    alignSelf: 'center',
    marginBottom: hp(2.21),
  },
  subtitle: {
    color: colors.textRGBA,
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
  },
});
