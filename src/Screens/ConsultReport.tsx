import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
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
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setOrderData } from '../store/Slices/orderSlice';
import RenderHTML from 'react-native-render-html';

type RootStackParamList = {
  ConsultReport: { item: Consultation };
};

type ConsultReportRouteProp = RouteProp<RootStackParamList, 'ConsultReport'>;

export default function ConsultReport(): React.JSX.Element {
  const route = useRoute<ConsultReportRouteProp>();
  const { item } = route.params;
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const [prescriptionData, setPrescriptionData] = useState<any>(null);
  const [aiAnalysisData, setAiAnalysisData] = useState<any>(null);

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
          const pd = docSnapshot.data();
          setPrescriptionData(pd);
          dispatch(setOrderData(pd as any));
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
        }
      } catch (error) {
        console.error('Error fetching review IDs:', error);
      }
    };

    getData();
  }, [user?.uid, item?.prescriptionId, item?.aiConsultationId, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Consult details" isPadding />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.doctorDetailsView}>
            <Image
              style={styles.doctorImage}
              source={
                item?.doctorProfilePhoto
                  ? { uri: item.doctorProfilePhoto }
                  : icons.dummyDoctor
              }
            />
          </View>
          <View style={styles.doctorNameContainer}>
            <Text style={styles.doctorName}>Dr. {item?.doctorName}</Text>
            <Text style={styles.doctorPositionName}>
              Snr. Dermatologist (MD,OD)
            </Text>
          </View>
        </View>
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
    marginTop: hp(3.07),
  },
  doctorImage: {
    height: hp(25),
    width: '100%',
    borderRadius: wp(5.33),
    resizeMode: 'cover',
  },
  mainContainer: {
    paddingHorizontal: wp(4.26),
  },
  doctorDetailsView: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  doctorNameContainer: {
    marginTop: hp(1.23),
  },
  doctorName: {
    fontSize: fontSize(25),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  doctorPositionName: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.textRGBA,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(1.84),
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
