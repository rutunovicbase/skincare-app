import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { Header } from '../Components/common/Header';
import { fontSize, hp, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import moment from 'moment';

export default function ProfileDetails() {
  const userInfo = useSelector((state: RootState) => state.auth.user);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header isPadding title="Personal info" />
      <View style={styles.contentContainer}>
        <View style={styles.nameContainer}>
          <View>
            <Text style={styles.lableText}>First name</Text>
            <View style={styles.nameTextContainer}>
              <Text style={styles.nameText}>{userInfo?.firstName}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.lableText}>Last name</Text>
            <View style={styles.nameTextContainer}>
              <Text style={styles.nameText}>{userInfo?.lastName}</Text>
            </View>
          </View>
        </View>
        {userInfo?.phoneNumber && (
          <View style={styles.mobileNoContainer}>
            <Text style={styles.lableText}>Mobile no</Text>
            <View style={styles.mobileNumberView}>
              <Text style={styles.nameText}>{userInfo?.phoneNumber}</Text>
            </View>
          </View>
        )}
        {userInfo?.email && (
          <View style={styles.mobileNoContainer}>
            <Text style={styles.lableText}>Email</Text>
            <View style={styles.mobileNumberView}>
              <Text style={styles.nameText}>{userInfo?.email}</Text>
            </View>
          </View>
        )}
        <View style={styles.mobileNoContainer}>
          <Text style={styles.lableText}>Gender</Text>
          <View style={styles.genderView}>
            <Text style={styles.nameText}>{userInfo?.gender}</Text>
            <Image
              source={
                userInfo?.gender === 'Male'
                  ? icons.Male
                  : userInfo?.gender === 'Female'
                  ? icons.Female
                  : icons.Other
              }
              style={styles.genderIcon}
              tintColor={colors.secondaryPurple}
            />
          </View>
        </View>
        <View style={styles.mobileNoContainer}>
          <Text style={styles.lableText}>D.O.B</Text>
          <View style={styles.dobTextContainer}>
            <Text style={[styles.nameText, styles.dobTextStyle]}>
              {moment(userInfo?.birthdate).format('DD')}
            </Text>
            <Text style={[styles.nameText, styles.dobTextStyle]}>
              {moment(userInfo?.birthdate).format('MM')}
            </Text>
            <Text
              style={[
                styles.nameText,
                styles.dobTextStyle,
                { borderRightWidth: 0 },
              ]}
            >
              {moment(userInfo?.birthdate).format('YYYY')}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoView}>
          <Image source={icons.info} style={styles.infoIcon} />
          <Text style={styles.infoText}>
            You can’t change your personal information
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
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(1.84),
  },
  lableText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
    color: colors.black,
    marginBottom: hp(1.23),
  },
  nameTextContainer: {
    height: hp(4.92),
    width: wp(41.86),
    borderWidth: wp(0.26),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  nameText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(12),
    color: colors.textRGBA,
  },
  mobileNoContainer: {
    marginBottom: hp(1.84),
  },
  mobileNumberView: {
    height: hp(4.92),
    width: '100%',
    borderWidth: wp(0.26),
    borderRadius: wp(100),
    borderColor: colors.borderGray,
    justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  genderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(4.92),
    width: '100%',
    borderWidth: wp(0.26),
    borderRadius: wp(100),
    borderColor: colors.borderGray,
    paddingHorizontal: wp(4),
  },
  dobTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: hp(4.92),
    width: '100%',
    borderWidth: wp(0.26),
    borderRadius: wp(100),
    borderColor: colors.borderGray,
  },
  genderIcon: {
    height: wp(4),
    width: wp(4),
  },
  dobTextStyle: {
    borderRightWidth: wp(0.26),
    width: wp(29.6),
    textAlign: 'center',
    borderRightColor: colors.borderGray,
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
});
