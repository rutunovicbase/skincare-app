import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { Header } from '../Components/common/Header';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';

export default function LifestyleInsights() {
  const onPressSleepCycle = () => {
    navigate('YourLifestyle');
  };

  const onPressFoodHabbits = () => {
    navigate('DietaryPreferences');
  };

  const onPressStressLevel = () => {
    navigate('DietaryPreferences');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header isPadding title="Daily Lifestyle Insights" />
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.commonContainerStyle}
          onPress={onPressSleepCycle}
        >
          <Text style={styles.lifstyleName}>Sleep cycle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonContainerStyle}
          onPress={onPressFoodHabbits}
        >
          <Text style={styles.lifstyleName}>Food habbits</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.commonContainerStyle}
          onPress={onPressStressLevel}
        >
          <Text style={styles.lifstyleName}>Stress level</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoView}>
          <Image source={icons.info} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Modify your lifestyle details as needed
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: wp(4.26),
    marginTop: hp(2.46),
  },
  commonContainerStyle: {
    borderWidth: wp(0.26),
    borderColor: colors.borderGray,
    height: hp(4.92),
    borderRadius: wp(100),
    justifyContent: 'center',
    paddingHorizontal: wp(4.26),
    marginBottom: hp(1.84),
  },
  infoContainer: {
    flexDirection: 'row',
    paddingHorizontal: wp(4.26),
    flex: 1,
    alignItems: 'flex-end',
    marginBottom: hp(1.23),
  },
  infoIcon: {
    height: wp(4.93),
    width: wp(4.93),
    marginRight: wp(1.1),
  },
  infoText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(14),
    color: colors.textRGBA,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lifstyleName: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.black,
  },
});
