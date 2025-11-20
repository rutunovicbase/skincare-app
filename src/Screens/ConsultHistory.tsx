import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { icons } from '../Constant/Icons';
import { colors } from '../Constant/Colors';
import { fonts } from '../Constant/Fonts';
import { Consultation } from '../Constant/types';
import { CancelConsultationModal } from '../Components/ModalComponent/CancelConsultationModal';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export default function ConsultHistory() {
  const [cancelConsultModalVisible, setCancelConsultModalVisible] =
    useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const onPressReport = (item: Consultation) => {
    if (item?.status === 'completed') {
      navigate('ConsultReport', { item });
    }
  };

  const onPressCancel = (item?: Consultation) => {
    if (item) setSelectedConsultation(item);
    setCancelConsultModalVisible(!cancelConsultModalVisible);
  };

  const onPressYes = async () => {
    if (!selectedConsultation) return;

    try {
      await firestore()
        .collection('appointments')
        .doc(selectedConsultation.id)
        .update({
          status: 'cancelled',
        });

      setConsultations(prev =>
        prev.map(c =>
          c.id === selectedConsultation.id ? { ...c, status: 'cancelled' } : c,
        ),
      );

      setCancelConsultModalVisible(false);
      setSelectedConsultation(null);
    } catch (error) {
      console.error('Error cancelling consultation:', error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await firestore()
        .collection('appointments')
        .where('patientId', '==', user?.uid)
        .get();

      if (!querySnapshot.empty) {
        const data: Consultation[] = [];
        querySnapshot.forEach(doc => {
          const reviewData = doc.data();
          if (reviewData) {
            data.push({
              ...(reviewData as Consultation),
              id: doc.id,
            });
          }
        });
        setConsultations(data);
      }
    };
    getData();
  }, [user?.uid]);

  const renderItem = ({ item }: { item: Consultation }) => {
    const cancelStyle = {
      opacity: item?.status === 'cancelled' ? 0.5 : 1,
    };
    return (
      <TouchableOpacity
        style={[styles.card, cancelStyle]}
        activeOpacity={0.7}
        onPress={() => onPressReport(item)}
        disabled={item?.status === 'cancelled'}
      >
        <Text
          style={[
            styles.consultStatus,
            {
              color:
                item?.status === 'cancelled' ? colors.cancelRed : colors.text,
            },
          ]}
        >
          {item?.status === 'completed'
            ? 'Complete Consult'
            : item?.status === 'cancelled'
            ? 'Cancel Consult'
            : 'Upcoming Consult'}
        </Text>

        <View style={styles.cardContainerView}>
          <View style={styles.cardLeftView}>
            <Image
              source={
                item?.doctorProfilePhoto
                  ? { uri: item.doctorProfilePhoto }
                  : icons.dummyDoctor
              }
              style={styles.doctorAvatar}
            />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorNameText}>Dr. {item.doctorName}</Text>
              <Text style={styles.doctorSpecializationText}>
                Snr. Dermatologist (MD,OD)
              </Text>
              <Text style={styles.concernText}>Concern: {item?.disease}</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>

          <View style={styles.cardRightView}>
            {item?.status === 'Booked' && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => onPressCancel(item)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {consultations.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.iconBox}>
              <Image
                source={icons.info}
                style={styles.iconStyle}
                tintColor={colors.background}
              />
            </View>
          </View>
          <Text style={styles.noDataText}>
            You don’t have any active consultations right now.
          </Text>
        </View>
      ) : (
        <FlatList
          data={consultations}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <CancelConsultationModal
        visible={cancelConsultModalVisible}
        onPressBack={() => onPressCancel()}
        onPressYes={onPressYes}
        onPressNo={() => onPressCancel()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(3.07),
    paddingHorizontal: wp(4.26),
    backgroundColor: colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    height: wp(37.33),
    width: wp(37.33),
    backgroundColor: colors.primaryBorder,
    borderRadius: wp(37.33),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(2.46),
  },
  iconBox: {
    height: wp(29.33),
    width: wp(29.33),
    backgroundColor: colors.secondaryPurple,
    borderRadius: wp(29.33),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: {
    height: wp(13.33),
    width: wp(13.33),
  },
  noDataText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    textAlign: 'center',
    color: colors.textRGBA,
    paddingHorizontal: wp(16.26),
  },
  listContainer: {
    paddingBottom: hp(2),
  },
  card: {
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(4),
    padding: wp(4),
    marginBottom: hp(1.84),
    elevation: 2,
  },
  consultStatus: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(1.84),
  },
  cardContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeftView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginRight: wp(2.66),
  },
  doctorAvatar: {
    height: hp(10.46),
    width: hp(10.46),
    backgroundColor: colors.secondaryPurple,
    borderRadius: wp(4),
  },
  doctorDetails: {
    marginLeft: wp(2.66),
    width: wp(34.13),
  },
  doctorSpecializationText: {
    fontSize: fontSize(12),
    fontFamily: fonts.Semibold,
    color: colors.textRGBA,
    marginBottom: hp(0.61),
  },
  concernText: {
    color: colors.text,
    fontSize: fontSize(12),
    fontFamily: fonts.Semibold,
    marginBottom: wp(1.33),
  },
  dateText: {
    color: colors.text,
    fontSize: fontSize(12),
    fontFamily: fonts.Semibold,
  },
  doctorNameText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  cardRightView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    height: hp(10.46),
  },
  cancelButton: {
    backgroundColor: colors.cancelRed,
    paddingHorizontal: wp(2.66),
    paddingVertical: wp(1.33),
    borderRadius: wp(100),
  },
  cancelText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.background,
  },
});
