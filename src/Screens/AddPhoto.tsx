import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
} from 'react-native';
import { colors } from '../Constant/Colors';
import { wp, hp, fontSize, navigate } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import LinearButton from '../Components/common/LinearButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import OnboardingHeader from '../Components/common/OnboardingHeader';
import { useTranslation } from 'react-i18next';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { fetchUserData } from '../store/Slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import moment from 'moment';

export default function AddPhoto() {
  const { t } = useTranslation();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [cameraPermission, setCameraPermission] = useState<
    'authorized' | 'denied' | 'not-determined' | 'granted' | 'restricted'
  >('not-determined');
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    (async () => {
      const status = await Camera.getCameraPermissionStatus();
      setCameraPermission(status);
    })();
  }, []);

  const requestCameraAndOpen = async () => {
    if (cameraPermission !== 'authorized' && cameraPermission !== 'granted') {
      const result = await Camera.requestCameraPermission();
      setCameraPermission(result);
      if (result !== 'authorized' && result !== 'granted') return;
    }
    setIsCameraVisible(true);
  };

  const capturePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({
        flash: 'off',
        qualityPrioritization: 'balanced',
      } as any);
      if (photo?.path) {
        const uri =
          Platform.OS === 'android' ? 'file://' + photo.path : photo.path;
        setPhotoUri(uri);
        setIsCameraVisible(false);
      }
    } catch (e) {}
  };

  const pickFromGallery = async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.9,
      });
      const uri = res.assets?.[0]?.uri;
      if (uri) setPhotoUri(uri);
    } catch (e) {}
  };

  const uploadAndContinue = async () => {
    try {
      const currentUser = auth().currentUser;
      if (!currentUser) {
        navigate('Login');
        return;
      }
      let downloadURL: string | null = null;
      if (photoUri) {
        const fileExt = photoUri.split('.').pop() || 'jpg';
        const path = `profilePhotos/${currentUser.uid}.${fileExt}`;
        const ref = storage().ref(path);
        await ref.putFile(photoUri);
        downloadURL = await ref.getDownloadURL();
      }

      await firestore()
        .collection('users')
        .doc(currentUser.uid)
        .set(
          {
            profilePhotoURL: downloadURL ?? null,
            detailsCompleted: true,
            updatedAt: moment().toISOString(),
          },
          { merge: true },
        );

      await dispatch(fetchUserData(currentUser.uid));

      navigate('MainTabs');
    } catch (e) {
      navigate('MainTabs');
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <OnboardingHeader
        isIcon
        title={t('JustOneMoreTap')}
        titleStyle={styles.title}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{t('AddYourProfilePicture')}</Text>
        <Text style={styles.subTitle}>{t('CaptureOrUploadPhoto')}</Text>
        <View style={styles.imageContainer}>
          {photoUri ? (
            <Image source={{ uri: photoUri }} style={styles.userImageStyle} />
          ) : (
            <Image source={icons.user} style={styles.userImageStyle} />
          )}
        </View>
        <View style={styles.uploadImageContainer}>
          <TouchableOpacity
            style={styles.imageOptionContainer}
            onPress={requestCameraAndOpen}
          >
            <View style={styles.cameraContainer}>
              <Image source={icons.camera} style={styles.cameraIcon} />
            </View>
            <Text style={styles.imageOptionText}>{t('Camera')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.imageOptionContainer}
            onPress={pickFromGallery}
          >
            <View style={styles.cameraContainer}>
              <Image source={icons.gallery} style={styles.galleryIcon} />
            </View>
            <Text style={styles.imageOptionText}>{t('Gallery')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LinearButton
        title={t('Continue')}
        onPress={uploadAndContinue}
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
      />

      <Modal visible={isCameraVisible} transparent animationType="slide">
        <View style={styles.cameraModalContainer}>
          {device &&
          (cameraPermission === 'authorized' ||
            cameraPermission === 'granted') ? (
            <Camera
              ref={cameraRef}
              style={styles.cameraView}
              device={device}
              isActive={isCameraVisible}
              photo
            />
          ) : null}
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={capturePhoto}
            >
              <Text style={styles.captureText}>{t('Continue')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsCameraVisible(false)}
            >
              <Text style={styles.cancelText}>{t('Cancel')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    marginHorizontal: wp(4.26),
    marginTop: hp(7.78),
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSize(22),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  subTitle: {
    fontFamily: fonts.Bold,
    fontSize: fontSize(16),
    marginTop: hp(2.46),
    paddingRight: wp(18.66),
    marginBottom: hp(7.38),
  },
  imageContainer: {
    backgroundColor: colors.primaryBorder,
    height: wp(40),
    width: wp(40),
    borderRadius: wp(40),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: hp(10.22),
  },
  userImageStyle: {
    height: wp(32),
    width: wp(32),
    borderRadius: wp(32),
  },
  uploadImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cameraContainer: {
    height: hp(8),
    width: hp(8),
    borderWidth: wp(0.26),
    borderRadius: hp(1.23),
    marginBottom: hp(0.86),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondaryGray,
    borderColor: colors.blackBorder,
  },
  cameraIcon: {
    height: wp(8.26),
    width: wp(9.33),
  },
  galleryIcon: {
    height: wp(10.66),
    width: wp(10.66),
  },
  imageOptionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  imageOptionText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
    color: colors.black,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
    marginHorizontal: wp(4.26),
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  cameraModalContainer: {
    flex: 1,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraView: {
    width: '100%',
    height: '80%',
  },
  cameraControls: {
    position: 'absolute',
    bottom: hp(4),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  captureButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    paddingHorizontal: wp(6),
    borderRadius: wp(100),
  },
  captureText: {
    color: colors.text,
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
  },
  cancelButton: {
    backgroundColor: colors.secondaryGray,
    paddingVertical: hp(1.29),
    paddingHorizontal: wp(6),
    borderRadius: wp(100),
  },
  cancelText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
  },
});
