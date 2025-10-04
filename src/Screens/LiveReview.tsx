import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { icons } from '../Constant/Icons';
import { fontSize, hp, wp, navigate } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';
import { AGORA_CONFIG, UserRole } from '../Constant/AgoraConfig';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import moment from 'moment';

export default function LiveReview(): React.JSX.Element {
  const [isCalling, setIsCalling] = useState(false);
  const userInfo = useSelector((state: RootState) => state.auth.user);

  const getAgoraToken = async (channelName: string, uid: string) => {
    const res = await fetch(AGORA_CONFIG.TOKEN_SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channelName,
        uid,
        role: 'publisher',
        expireSeconds: 3600,
      }),
    });

    const json = await res.json();
    const token = json?.data?.token || json?.token;
    const expireAt = json?.data?.expireAt || null;
    if (!token) throw new Error('Token not found');

    return { token, expireAt };
  };

  const onPressCallNow = async () => {
    if (!userInfo?.uid) return;

    try {
      setIsCalling(true);

      let aiConsultationReport: any = null;
      try {
        const reviewsRef = firestore()
          .collection('users')
          .doc(userInfo.uid)
          .collection('reviews');
        const latest = await reviewsRef
          .orderBy('createdAt', 'desc')
          .limit(1)
          .get();
        if (!latest.empty) {
          aiConsultationReport = latest.docs[0].data()?.aiConsultation ?? null;
        }
      } catch (e) {}

      const channelName = `consultation-${Date.now()}-${userInfo.uid}`;
      const { token } = await getAgoraToken(channelName, String(userInfo.uid));

      const sessionRef = await firestore()
        .collection('videoCallSessions')
        .add({
          patientId: userInfo.uid,
          patientName: userInfo?.displayName || userInfo?.firstName || '',
          channelName,
          status: 'CONNECTING',
          createdAt: moment().toISOString(),
          aiConsultationReport: aiConsultationReport ?? null,
          patientToken: token,
          tokenRole: 'publisher',
          receptionistJoined: false,
          profilePhotoURL: userInfo?.profilePhotoURL,
        });
      const sessionId = sessionRef.id;
      await sessionRef.update({ sessionId });

      navigate('VideoCall', {
        userRole: UserRole.CLIENT,
        channelName,
        rtcToken: token,
        sessionId,
      });
    } catch (e) {
      setIsCalling(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={icons.receptionist} style={styles.imageStyle} />
      <View style={styles.mainContainer}>
        <Text style={styles.liveReviewStyle}>
          Live Review of Your Skin Report
        </Text>
        <Text style={styles.liveReviewTextStyle}>
          Book your slot for a live video call — our assistant will review your
          AI skin report and guide you, with an option to consult a
          dermatologist
        </Text>
        <Text style={styles.uploadText}>
          Upload report <Text style={styles.uploadSpanText}>(if any)</Text>
        </Text>
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportText}>Report</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footerContainer}>
        <LinearButton
          title={isCalling ? 'Connecting...' : 'Call Now'}
          style={[
            styles.callNowButton,
            isCalling && styles.callNowButtonDisabled,
          ]}
          textStyle={styles.callNowButtonText}
          onPress={onPressCallNow}
          disabled={isCalling}
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
  imageStyle: {
    height: hp(49.63),
    width: wp(100),
    resizeMode: 'contain',
  },
  mainContainer: {
    paddingHorizontal: wp(4.26),
    marginTop: hp(3.69),
  },
  liveReviewStyle: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(25),
    marginRight: wp(15.73),
    paddingRight: wp(6.66),
    marginBottom: hp(1.23),
  },
  liveReviewTextStyle: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(14),
    marginBottom: hp(3.07),
  },
  uploadText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    marginBottom: hp(1.84),
  },
  uploadSpanText: {
    fontSize: fontSize(12),
    fontFamily: fonts.Semibold,
    color: colors.textRGBA,
  },
  reportButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.41),
    borderWidth: wp(0.23),
    borderRadius: wp(100),
    borderColor: colors.borderGray,
  },
  reportText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
  },
  callNowButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
  },
  callNowButtonDisabled: {
    backgroundColor: colors.textRGBA,
    opacity: 0.6,
  },
  callNowButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: wp(4.26),
  },
});
