import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Consultation } from '../Constant/types';
import { Header } from '../Components/common/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { fontSize, goBack, hp, wp } from '../Helpers/globalFunction';
import { icons } from '../Constant/Icons';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';

type RootStackParamList = {
  ConsultReport: { item: Consultation };
};

type ConsultReportRouteProp = RouteProp<RootStackParamList, 'ConsultReport'>;

export default function ConsultReport(): React.JSX.Element {
  const route = useRoute<ConsultReportRouteProp>();
  const { item } = route.params;

  const items = [
    'Acne & Pimples: Presence of active breakouts and acne marks.',
    'Dark Circles: Mild to moderate pigmentation under the eyes.',
    'Fine Lines/Wrinkles: Early signs of aging around the forehead and eyes.',
    'Skin Texture: Uneven surface due to acne and dryness.',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Consult details" isPadding />
      <ScrollView style={styles.mainContainer}>
        <ImageBackground
          style={styles.cardContainer}
          source={icons.checksGradient}
        >
          <View style={styles.doctorDetailsView}>
            <Image style={styles.doctorImage} source={item.avatar} />
            <View style={styles.doctorNameContainer}>
              <Text style={styles.doctorName}>{item?.doctor}</Text>
              <Text style={styles.doctorPositionName}>
                {item?.specialization}
              </Text>
            </View>
          </View>
          <View style={styles.doctorSpecializationContainer}>
            <View style={styles.doctorExperienceView}>
              <Text style={styles.yearsText}>
                <Text style={styles.experienceCountText}>+4</Text>/years
              </Text>
              <Text style={[styles.yearsText, styles.experienceText]}>
                Experience
              </Text>
            </View>
            <View style={styles.doctorExperienceView}>
              <Text style={styles.experienceCountText}>+41k</Text>
              <Text style={[styles.yearsText, styles.experienceText]}>
                Patients
              </Text>
            </View>
            <View style={styles.doctorExperienceView}>
              <View style={styles.starRatingContainer}>
                <Image
                  source={icons.starFilled}
                  tintColor={colors.primary}
                  style={styles.starStyle}
                />
                <Text style={styles.experienceCountText}>4.5</Text>
              </View>
              <Text style={[styles.yearsText, styles.experienceText]}>
                Rating
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View style={styles.timeContainer}>
          <View style={styles.timeView}>
            <Image style={styles.timeImageStyle} source={icons.clock} />
            <Text style={styles.timeText}>10:00-10:30 A.M.</Text>
          </View>
          <View style={styles.timeView}>
            <Image style={styles.timeImageStyle} source={icons.calendar} />
            <Text style={styles.timeText}>Mon, 12 Aug 2025 </Text>
          </View>
        </View>
        <View style={styles.concernContainer}>
          <Text style={styles.concernTitleText}>Concern reason</Text>
          <View style={styles.concernView}>
            {item?.Concern?.map(data => {
              return (
                <View style={styles.concernNameView}>
                  <Text style={styles.concernTextStyle}>{data}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <Text style={styles.consultationHighlightsText}>
          Consultation Highlights
        </Text>
        <View style={styles.consultationHighlightsContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>&bull;</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.recommendedCareText}>Recommended Care</Text>
        <View style={styles.recommendedCareContainer}>
          {items.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Text style={styles.bullet}>&bull;</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.medicineContainer}>
          <Text style={styles.takeThisMedicineText}>Take this medicine</Text>
          <Image source={icons.info} style={styles.infoIcon} />
        </View>
        <View>
          <Text style={styles.morningText}>In morning</Text>

          <Text style={styles.medicineNameText}>
            Gentle cleanser (non-foaming, pH balanced)
          </Text>
          <Text style={styles.medicineNameText}>
            Sunscreen SPF 30+ (broad-spectrum, oil-free)
          </Text>
          <Text style={styles.morningText}>In night</Text>

          <Text style={styles.medicineNameText}>Topical anti-acne cream</Text>
          <Text style={styles.medicineNameText}>
            Zinc tablets (once daily, after food)
          </Text>
        </View>
      </ScrollView>
      <View>
        <LinearButton
          title="Buy Medicine"
          style={styles.buyMedicineButton}
          textStyle={styles.buyMedicineText}
          onPress={goBack}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  cardContainer: {
    backgroundColor: colors.secondaryPurple,
    borderRadius: wp(5.33),
    marginTop: hp(3.07),
  },
  doctorImage: {
    height: hp(22.53),
    width: wp(50.66),
  },
  mainContainer: {
    paddingHorizontal: wp(4.26),
  },
  doctorDetailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doctorNameContainer: {
    position: 'absolute',
    left: wp(41.86),
    top: hp(6.4),
  },
  doctorName: {
    fontSize: fontSize(25),
    fontFamily: fonts.Semibold,
    color: colors.background,
    marginBottom: hp(0.61),
  },
  doctorPositionName: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.background,
    width: wp(37.06),
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  doctorSpecializationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: -hp(6.41),
    width: '100%',
  },
  doctorExperienceView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryGray,
    width: wp(24),
    height: hp(9.85),
    borderRadius: wp(4),
    elevation: 3,
  },
  yearsText: {
    fontSize: fontSize(12),
    fontFamily: fonts.Semibold,
    color: colors.textRGBA,
  },
  experienceCountText: {
    fontSize: fontSize(20),
    color: colors.secondaryPurple,
    fontFamily: fonts.Semibold,
  },
  experienceText: {
    marginTop: hp(0.61),
  },
  starStyle: {
    height: wp(5.33),
    width: wp(5.33),
    marginRight: wp(0.8),
  },
  starRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(8.25),
    backgroundColor: colors.secondaryPurple,
    paddingHorizontal: wp(4),
    paddingVertical: wp(2.66),
    borderRadius: wp(4),
  },
  timeView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeImageStyle: {
    width: wp(6.66),
    height: wp(6.66),
    marginRight: wp(1.33),
  },
  timeText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.background,
  },
  concernContainer: {
    marginTop: hp(3.07),
  },
  concernTitleText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(20),
    color: colors.black,
  },
  concernView: {
    paddingTop: hp(1.23),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  concernNameView: {
    backgroundColor: colors.primary,
    marginRight: wp(2.66),
    paddingHorizontal: wp(2.66),
    paddingVertical: wp(1.33),
    marginBottom: wp(2.66),
    borderRadius: wp(100),
  },
  concernTextStyle: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.secondaryPurple,
  },
  consultationHighlightsContainer: {
    borderWidth: wp(0.23),
    paddingTop: wp(4),
    paddingHorizontal: wp(4),
    borderRadius: wp(5.33),
  },
  consultationHighlightsText: {
    fontSize: fontSize(20),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginVertical: hp(1.84),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: wp(4),
  },
  bullet: {
    fontSize: fontSize(16),
    marginRight: wp(2.33),
  },
  itemText: {
    flex: 1,
    fontSize: fontSize(14),
    fontFamily: fonts.Regular,
    color: colors.text,
  },
  recommendedCareText: {
    fontSize: fontSize(20),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginTop: hp(3.07),
    marginBottom: hp(1.84),
  },
  recommendedCareContainer: {
    borderWidth: wp(0.23),
    paddingTop: wp(4),
    paddingHorizontal: wp(4),
    borderRadius: wp(5.33),
    backgroundColor: colors.secondaryGray,
  },
  medicineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(3.07),
    marginBottom: hp(1.84),
  },
  takeThisMedicineText: {
    fontSize: fontSize(20),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  infoIcon: {
    height: wp(6.66),
    width: wp(6.66),
  },
  morningText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    marginBottom: hp(1.72),
  },
  medicineNameText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    borderWidth: wp(0.23),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.41),
    marginBottom: hp(1.72),
  },
  buyMedicineButton: {
    backgroundColor: colors.primary,
    marginHorizontal: wp(4.26),
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.23),
  },
  buyMedicineText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
});
