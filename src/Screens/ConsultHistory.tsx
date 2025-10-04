import React, { useState } from 'react';
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

const consultations: Consultation[] = [
  {
    id: '1',
    doctor: 'Dr Naira jaswal',
    specialization: 'Snr. Dermatologist (MD,OD)',
    Concern: ['Pimples', 'Acne', 'Pigmentation', 'Acne', 'Dark circles'],
    date: 'Tue, 14 Aug 10:00 A.M.',
    rating: 4.5,
    isComplete: false,
    profilePhotoURL: icons.dummyDoctor,
    isCancelled: false,
  },
  {
    id: '2',
    doctor: 'Dr Naira jaswal',
    specialization: 'Snr. Dermatologist (MD,OD)',
    Concern: ['Pigmentation', 'Pimples'],
    date: 'Tue, 14 Aug 10:00 A.M.',
    rating: 4.5,
    isComplete: false,
    profilePhotoURL: icons.dummyDoctor,
    isCancelled: true,
  },
  {
    id: '3',
    doctor: 'Dr Naira jaswal',
    specialization: 'Snr. Dermatologist (MD,OD)',
    date: 'Tue, 14 Aug 10:00 A.M.',
    Concern: ['Pimples', 'Dark circles'],
    rating: 4.5,
    isComplete: true,
    profilePhotoURL: icons.dummyDoctor,
    isCancelled: false,
  },
];

export default function ConsultHistory() {
  const [cancelConsultModalVisible, setCancelConsultModalVisible] =
    useState(false);
  const onPressReport = (item: Consultation) => {
    if (item?.isComplete && !item?.isCancelled) {
      navigate('ConsultReport', { item });
    }
  };

  const onPressCancel = () => {
    setCancelConsultModalVisible(!cancelConsultModalVisible);
  };

  const renderItem = ({ item }: { item: Consultation }) => {
    const cancelStyle = {
      opacity: item?.isCancelled && !item?.isComplete ? 0.5 : 1,
    };
    return (
      <TouchableOpacity
        style={[styles.card, cancelStyle]}
        activeOpacity={0.7}
        onPress={() => {
          onPressReport(item);
        }}
        disabled={item?.isCancelled}
      >
        <Text
          style={[
            styles.consultStatus,
            {
              color:
                item?.isCancelled && !item?.isComplete
                  ? colors.cancelRed
                  : colors.text,
            },
          ]}
        >
          {item?.isComplete && !item?.isCancelled
            ? 'Complete Consult'
            : item?.isCancelled && !item?.isComplete
            ? 'Cancel Consult'
            : 'Upcoming Consult'}
        </Text>
        <View style={styles.cardContainerView}>
          <View style={styles.cardLeftView}>
            <Image source={item.profilePhotoURL} style={styles.doctorAvatar} />
            <View style={styles.doctorDetails}>
              <Text style={styles.doctorNameText}>{item.doctor}</Text>
              <Text style={styles.doctorSpecializationText}>
                {item.specialization}
              </Text>
              <Text style={styles.concernText}>
                Concern: {item?.Concern[0]}
              </Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
          <View style={styles.cardRightView}>
            <View>
              <View style={styles.ratingView}>
                <Image source={icons.starFilled} style={styles.starStyle} />
                <Text style={styles.ratingCountText}>{item.rating}</Text>
              </View>
              <Text style={styles.ratingText}>Rating</Text>
            </View>
            {!item?.isComplete && !item?.isCancelled && (
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onPressCancel}
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
        onPressBack={onPressCancel}
        onPressYes={onPressCancel}
        onPressNo={onPressCancel}
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
  },
  cardRightView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    height: hp(10.46),
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starStyle: {
    height: wp(5.33),
    width: wp(5.33),
    tintColor: colors.primary,
    marginRight: wp(0.8),
  },
  ratingCountText: {
    fontSize: fontSize(20),
    color: colors.secondaryPurple,
    fontFamily: fonts.Semibold,
  },
  ratingText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(12),
    textAlign: 'center',
    color: colors.textRGBA,
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
