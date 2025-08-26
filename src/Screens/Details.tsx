import React from 'react';
import { Header } from '../Components/common/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { icons } from '../Constant/Icons';
import { fonts } from '../Constant/Fonts';

const items = [
  {
    detectedProblem: 'Acne & Pimple',
    severity: 'High',
  },
  {
    detectedProblem: 'Pigmentation',
    severity: 'Moderate',
  },
  {
    detectedProblem: 'Dark Circles',
    severity: 'High',
  },
];

const analysisItems = [
  {
    title: 'Acne & Pimples',
    points: [
      'Small red pimples are present on the cheeks, chin, and forehead.',
      'Mild inflammatory acne with visible redness.',
    ],
  },
  {
    title: 'Post-Acne Marks / Blemishes',
    points: [
      'Light spots and pigmentation visible in areas affected by previous breakouts.',
    ],
  },
  {
    title: 'Dark Circles',
    points: [
      'Mild to moderate dark circles under the eyes, possibly due to pigmentation or tiredness.',
    ],
  },
  {
    title: 'Fine Lines / Early Wrinkles',
    points: [
      'Subtle lines on the forehead, suggesting early signs of aging or skin stress.',
    ],
  },
  {
    title: 'Overall Skin Texture',
    points: [
      'Uneven skin tone with slight roughness.',
      'Enlarged pores in cheek and T–zone area.',
    ],
  },
];

export default function Details(): React.JSX.Element {
  const onPressDisease = (item: string) => {
    navigate('DiseaseDetails', { item });
  };

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
          {items?.map(item => {
            return (
              <TouchableOpacity
                style={styles.problemContainer}
                onPress={() => {
                  onPressDisease(item?.detectedProblem);
                }}
              >
                <View>
                  <Text style={styles.problemText}>
                    {item?.detectedProblem}
                  </Text>
                  <Text style={styles.severityText}>{item?.severity}</Text>
                </View>
                <Image
                  source={icons.crossArrow}
                  style={styles.crossArrowStyle}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.reportText}>Ai Analysis</Text>
        <View style={styles.problemDetailsContainer}>
          {analysisItems.map((item, index) => (
            <View key={index}>
              <Text style={styles.analysisTitle}>
                {index + 1}. {item.title}
              </Text>
              {item.points.map((point, idx) => (
                <Text key={idx} style={styles.analysisBullet}>
                  • {point}
                </Text>
              ))}
            </View>
          ))}
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
