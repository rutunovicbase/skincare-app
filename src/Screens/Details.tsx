import React from 'react';
import { Header } from '../Components/common/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { colors } from '../Constant/Colors';
import { fontSize, hp, wp } from '../Helpers/globalFunction';
import { icons } from '../Constant/Icons';
import { fonts } from '../Constant/Fonts';
import { RouteProp } from '@react-navigation/native';
import { SkinScanItem, AIConsultation } from '../Constant/types';

type RootStackParamList = {
  SkinScanHistory: undefined;
  Details: { item: SkinScanItem };
};

type DetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;

type Props = {
  route: DetailsRouteProp;
};

export default function Details({ route }: Props): React.JSX.Element {
  const { item: scanItem } = route.params;
  // const onPressDisease = (disease: string) => {
  //   navigate('DiseaseDetails', { item: disease });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Details" isPadding />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.userImageContainer}>
          <Image
            source={icons.detailsUser}
            style={styles.userImageStyle}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.reportText}>Report</Text>
        <View style={styles.problemsContainer}>
          {(scanItem?.aiConsultation ?? []).map((ai: AIConsultation) => {
            return (
              // <TouchableOpacity
              //   key={idx}
              //   style={styles.problemContainer}
              //   onPress={() => {
              //     onPressDisease(ai?.problem);
              //   }}
              // >
              <View style={styles.problemContainer}>
                <View style={styles.problemTextContainer}>
                  <Text
                    style={styles.problemText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {ai?.problem}
                  </Text>
                  <Text
                    style={styles.severityText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {ai?.severity}
                  </Text>
                </View>
                <Image
                  source={icons.crossArrow}
                  style={styles.crossArrowStyle}
                />
              </View>
              // </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.reportText}>Ai Analysis</Text>
        <View style={styles.problemDetailsContainer}>
          {(scanItem?.aiConsultation ?? []).map(
            (ai: AIConsultation, index: number) => (
              <View key={index}>
                <Text style={styles.analysisTitle}>
                  {index + 1}. {ai?.problem}
                </Text>
                {ai?.description ? (
                  <Text style={styles.analysisBullet}>• {ai.description}</Text>
                ) : null}
                {ai?.recommended_action ? (
                  <Text style={styles.analysisBullet}>
                    • {ai.recommended_action}
                  </Text>
                ) : null}
              </View>
            ),
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainContainer: {
    paddingHorizontal: wp(4.26),
  },
  userImageContainer: {
    height: hp(24.63),
    width: 'auto',
    backgroundColor: colors.secondaryGray,
    elevation: 3,
    borderRadius: wp(5.33),
    alignItems: 'center',
    marginVertical: hp(3.07),
  },
  userImageStyle: {
    height: '100%',
  },
  reportText: {
    fontSize: fontSize(25),
    fontFamily: fonts.Semibold,
    color: colors.black,
    marginBottom: hp(1.84),
  },
  problemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  problemContainer: {
    backgroundColor: colors.secondaryGray,
    paddingVertical: hp(1.84),
    paddingHorizontal: wp(3.2),
    borderRadius: wp(4),
    width: wp(42.13),
    marginBottom: hp(1.84),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  problemTextContainer: {
    width: wp(29),
    paddingRight: wp(2),
  },
  problemText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    marginBottom: hp(0.61),
  },
  severityText: {
    color: colors.secondaryPurple,
    fontFamily: fonts.Bold,
    fontSize: fontSize(16),
  },
  crossArrowStyle: {
    height: wp(6.66),
    width: wp(6.66),
  },
  problemDetailsContainer: {
    backgroundColor: colors.primary,
    borderRadius: wp(5.33),
    paddingHorizontal: wp(4),
    paddingBottom: wp(4),
    marginBottom: hp(3.07),
  },
  analysisTitle: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.black,
    marginTop: hp(1.84),
  },
  analysisBullet: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.black,
    marginTop: hp(0.5),
    lineHeight: hp(2.5),
  },
});
