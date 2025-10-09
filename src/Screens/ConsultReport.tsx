import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { icons } from '../Constant/Icons';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import RenderHTML from 'react-native-render-html';

type RootStackParamList = {
  ConsultReport: { item: Consultation };
};

type ConsultReportRouteProp = RouteProp<RootStackParamList, 'ConsultReport'>;

export default function ConsultReport(): React.JSX.Element {
  const route = useRoute<ConsultReportRouteProp>();
  const { item } = route.params;
  const { user } = useSelector((state: RootState) => state.auth);

  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const [aiAnalysisData, setAiAnalysisData] = useState<any>(null);
  console.log('🚀 ~ ConsultReport ~ aiAnalysisData:', aiAnalysisData);

  const onPressBuyMedicine = () => {
    navigate('OrderDetails');
  };

  useEffect(() => {
    const getData = async () => {
      if (!user?.uid || !item?.prescriptionId) return;

      try {
        const prescriptionDocRef = firestore()
          .collection('users')
          .doc(user.uid)
          .collection('prescriptions')
          .doc(item.prescriptionId);

        const docSnapshot = await prescriptionDocRef.get();

        if (docSnapshot.exists()) {
          setPrescriptionData(docSnapshot.data());
        } else {
          console.warn('Prescription not found');
        }
      } catch (error) {
        console.error('Error fetching prescription:', error);
      }

      try {
        const aiConsultationRef = firestore().collection('aiConsultation');

        const querySnapshot = await aiConsultationRef
          .where('userId', '==', user?.uid)
          .get();

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();

          const reviews = docData.review || [];

          reviews.forEach((r: any) => {
            if (r?.id === item?.aiConsultationId) {
              setAiAnalysisData(r);
            }
          });
        } else {
          console.log('No consultation found for this user.');
        }
      } catch (error) {
        console.error('Error fetching review IDs:', error);
      }
    };

    getData();
  }, [user?.uid, item?.prescriptionId, item?.aiConsultationId]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Consult details" isPadding />
      <ScrollView style={styles.mainContainer}>
        <ImageBackground
          style={styles.cardContainer}
          source={icons.checksGradient}
        >
          <View style={styles.doctorDetailsView}>
            <Image style={styles.doctorImage} source={icons.dummyDoctor} />
            <View style={styles.doctorNameContainer}>
              <Text style={styles.doctorName}>{item?.doctorName}</Text>
              <Text style={styles.doctorPositionName}>
                Snr. Dermatologist (MD,OD)
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
            <Text style={styles.timeText}>{item?.time}</Text>
          </View>
          <View style={styles.timeView}>
            <Image style={styles.timeImageStyle} source={icons.calendar} />
            <Text style={styles.timeText}>
              {moment(item?.date).format('ddd, DD MMM YYYY')}
            </Text>
          </View>
        </View>
        <Text style={styles.consultationHighlightsText}>Doctor's Remark</Text>
        <View style={styles.consultationHighlightsContainer}>
          <RenderHTML
            contentWidth={wp(100)}
            source={{ html: prescriptionData?.doctorConsultationReport }}
            baseStyle={styles.htmlText}
          />
        </View>
        <Text style={styles.consultationHighlightsText}>AI Analysis</Text>
        <View style={styles.consultationHighlightsContainer}>
          {aiAnalysisData?.aiConsultation?.map(
            (consult: any, index: number) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.bullet}>{'\u2022'}</Text>
                <Text style={styles.problemText}>
                  {consult.problem} :{' '}
                  <Text style={styles.descriptionText}>
                    {consult.description}
                  </Text>
                </Text>
              </View>
            ),
          )}
        </View>
        <View style={styles.medicineContainer}>
          <Text style={styles.takeThisMedicineText}>Take this medicine</Text>
          <Image source={icons.info} style={styles.infoIcon} />
        </View>
        {prescriptionData?.medications &&
        prescriptionData.medications.length > 0 ? (
          <View>
            {prescriptionData.medications.map((med: any, index: number) => (
              <View key={index}>
                {med.timeOfDay && (
                  <Text style={styles.morningText}>
                    {med.timeOfDay
                      .replace(/_/g, ', ')
                      .split(' ')
                      .map(
                        (word: string) =>
                          word.charAt(0).toUpperCase() + word.slice(1),
                      )
                      .join(' ')}
                  </Text>
                )}

                <Text style={styles.medicineNameText}>
                  {med.medication}, ({med.dosage})
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={[styles.medicineNameText, styles.noMedicineText]}>
            No medicines prescribed.
          </Text>
        )}
      </ScrollView>
      <View>
        <LinearButton
          title="Buy Medicine"
          style={styles.buyMedicineButton}
          textStyle={styles.buyMedicineText}
          onPress={onPressBuyMedicine}
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
    marginBottom: hp(1.84),
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
  consultationHighlightsContainer: {
    borderWidth: wp(0.23),
    padding: wp(4),
    paddingHorizontal: wp(4),
    borderRadius: wp(5.33),
    marginBottom: hp(2.53),
  },
  consultationHighlightsText: {
    fontSize: fontSize(20),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(1.84),
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
  problemText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  descriptionText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Regular,
    color: colors.text,
  },
  medicineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  noMedicineText: {
    textAlign: 'center',
    color: colors.textRGBA,
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
  htmlText: {
    fontSize: fontSize(16),
    color: colors.text,
    fontFamily: fonts.Medium,
  },
});
