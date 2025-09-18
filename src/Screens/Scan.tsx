import React, { useState, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import { launchImageLibrary } from 'react-native-image-picker';
import { colors } from '../Constant/Colors';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import { hp, wp, fontSize, goBack, navigate } from '../Helpers/globalFunction';
import RNFS from 'react-native-fs';
import LinearButton from '../Components/common/LinearButton';
import { OPEN_AI_KEY } from '@env';

interface SkinAnalysisResult {
  problem: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommended_action: string;
}

function Scan() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<
    SkinAnalysisResult[] | 'healthy' | null
  >(null);
  const [cameraActive, setCameraActive] = useState(true);
  const [activeCamera, setActiveCamera] = useState<string>('front');
  const cameraRef = useRef<Camera>(null);
  const device = useCameraDevice(activeCamera);
  const { hasPermission, requestPermission } = useCameraPermission();

  const takePhoto = async () => {
    if (!cameraRef.current) return;

    try {
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });

      const rawPath = photo.path || '';
      const photoPath = rawPath.startsWith('file://')
        ? rawPath
        : 'file://' + rawPath;

      setPhotoUri(photoPath);
      setCameraActive(false);
      analyzeSkin(photoPath);
    } catch (error) {
      Alert.alert('Error', 'Failed to take photo. Please try again.');
      setCameraActive(true);
    }
  };

  const toggleCamera = () => {
    setActiveCamera(prevCamera => (prevCamera === 'front' ? 'back' : 'front'));
  };

  const pickFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 1024,
        maxHeight: 1024,
        includeBase64: true,
      });

      if (result.assets && result.assets[0]) {
        const asset = result.assets[0];
        const dataUrl = asset.base64
          ? `data:${asset.type || 'image/jpeg'};base64,${asset.base64}`
          : asset.uri || '';
        setPhotoUri(asset.uri || null);
        if (dataUrl.startsWith('data:')) {
          await analyzeSkin(dataUrl);
        } else {
          Alert.alert(
            'Analysis unavailable',
            'Unable to read image data for analysis. Please try another image.',
          );
        }
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Failed to pick image from gallery. Please try again.',
      );
    }
  };

  const analyzeSkin = async (uri: string) => {
    setIsAnalyzing(true);
    const base64 = await RNFS.readFile(uri, 'base64');
    const ext = uri.split('.').pop()?.toLowerCase();
    const mimeType =
      ext === 'png'
        ? 'image/png'
        : ext === 'jpg' || ext === 'jpeg'
        ? 'image/jpeg'
        : 'image/jpeg';

    const dataUri = `data:${mimeType};base64,${base64}`;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${OPEN_AI_KEY}`);

    const raw = JSON.stringify({
      model: 'gpt-5',
      input: [
        {
          role: 'developer',
          content: [
            {
              type: 'input_text',
              text: 'You are a professional skin analyzer AI. Analyze skin images and detect visible conditions such as acne, pimples, blackheads, whiteheads, wrinkles, pigmentation, dark spots, redness, scars, dryness, oiliness, and uneven skin tone.\r\nReturn the result in JSON format only:\r\n[\r\n  {\r\n    "problem": "string",\r\n    "severity": "low | medium | high",\r\n    "description": "string",\r\n    "recommended_action": "string"\r\n  }\r\n]\r\nIf no issues found, return {"status":"healthy"}.',
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: 'Analyze this skin and return structured JSON.',
            },
            {
              type: 'input_image',
              image_url: dataUri,
            },
          ],
        },
      ],
      text: {
        format: {
          type: 'text',
        },
        verbosity: 'medium',
      },
      reasoning: {
        effort: 'medium',
      },
      tools: [],
      store: true,
      include: [
        'reasoning.encrypted_content',
        'web_search_call.action.sources',
      ],
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };

    fetch('https://api.openai.com/v1/responses', requestOptions)
      .then(async response => {
        const result = await response.json();

        const message = result.output?.find((o: any) => o.type === 'message');

        let analysisJson = null;
        if (message?.content?.length) {
          const rawText = message.content[0].text;
          try {
            analysisJson = JSON.parse(rawText);
          } catch (e) {}
        }
        setIsAnalyzing(false);
        setAnalysisResult(analysisJson);
      })

      .catch(error => {
        Alert.alert(
          'Analysis Error',
          'Failed to analyze skin. Please try again.',
        );
      });
  };

  const onPressContinue = () => {
    navigate('LiveReview');
  };

  const retakePhoto = () => {
    setPhotoUri(null);
    setAnalysisResult(null);
    setCameraActive(true);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return '#4CAF50';
      case 'medium':
        return '#FF9800';
      case 'high':
        return '#F44336';
      default:
        return colors.text;
    }
  };

  const renderAnalysisResults = () => {
    if (!analysisResult) return null;

    if (analysisResult === 'healthy') {
      return (
        <View style={styles.healthyContainer}>
          <Image source={icons.success} style={styles.successIcon} />
          <Text style={styles.healthyTitle}>Healthy Skin!</Text>
          <Text style={styles.healthySubtitle}>No skin issues detected</Text>
        </View>
      );
    }

    if (Array.isArray(analysisResult)) {
      return (
        <View style={styles.resultsContainer}>
          <FlatList
            data={analysisResult}
            keyExtractor={(_, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate={'fast'}
            snapToInterval={wp(66.66) + wp(6.66)}
            snapToAlignment={'start'}
            disableIntervalMomentum={true}
            renderItem={({ item }) => (
              <View style={styles.problemCard}>
                <View style={styles.problemHeader}>
                  <Text style={styles.problemName}>{item.problem}</Text>
                  <View
                    style={[
                      styles.severityBadge,
                      { backgroundColor: getSeverityColor(item.severity) },
                    ]}
                  >
                    <Text style={styles.severityText}>{item.severity}</Text>
                  </View>
                </View>
                <Text style={styles.problemDescription}>
                  {item.description}
                </Text>
              </View>
            )}
            contentContainerStyle={{ paddingHorizontal: wp(5.33) }}
          />
        </View>
      );
    }

    return null;
  };

  if (!hasPermission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Image source={icons.camera} style={styles.permissionIcon} />
          <Text style={styles.permissionTitle}>Camera Permission Required</Text>
          <Text style={styles.permissionSubtitle}>
            Please enable camera access to use the skin scanner.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (device == null) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Camera not available</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.fullscreenCameraWrapper}>
        {!photoUri ? (
          <>
            <Camera
              ref={cameraRef}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={cameraActive}
              photo={true}
            />

            <View style={styles.cameraOverlay}>
              {activeCamera === 'back' ? (
                <View style={styles.scanFrame}>
                  <View style={styles.corner} />
                  <View style={[styles.corner, styles.cornerTopRight]} />
                  <View style={[styles.corner, styles.cornerBottomLeft]} />
                  <View style={[styles.corner, styles.cornerBottomRight]} />
                </View>
              ) : (
                <View style={styles.ovelStyle}></View>
              )}
              <Text style={styles.scanInstruction}>
                Position your skin within the frame
              </Text>
            </View>

            <View style={styles.controlsContainerOverlay}>
              <TouchableOpacity
                style={styles.galleryButton}
                onPress={pickFromGallery}
              >
                <Image source={icons.gallery} style={styles.buttonIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.captureButton}
                onPress={takePhoto}
              >
                <Image source={icons.camera} style={styles.cameraIcon} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.galleryButton}
                onPress={toggleCamera}
              >
                <Image source={icons.flip} style={styles.buttonIcon} />
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.fullscreenPreviewWrapper}>
            <Image
              source={{ uri: photoUri }}
              style={styles.fullscreenPreview}
            />

            {isAnalyzing && (
              <View style={styles.analyzingOverlay}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={styles.analyzingText}>Analyzing your skin...</Text>
              </View>
            )}
            {!isAnalyzing && (
              <View style={styles.previewContent}>
                {renderAnalysisResults()}
                <View style={styles.buttonsContainer}>
                  <LinearButton
                    title="Recheck"
                    style={styles.recheckButton}
                    textStyle={styles.continueButtonText}
                    onPress={retakePhoto}
                  />
                  <LinearButton
                    title="Take consult"
                    style={styles.consultButton}
                    textStyle={styles.continueButtonText}
                    onPress={onPressContinue}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Scan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  fullscreenCameraWrapper: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: StatusBar?.currentHeight
      ? StatusBar?.currentHeight + hp(1.23)
      : hp(4.7),
    left: wp(4),
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(92),
  },
  backIcon: {
    height: wp(8),
    width: wp(8),
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: hp(4.31),
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: wp(70),
    height: wp(70),
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: hp(3.69),
    height: hp(3.69),
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderColor: colors.primary,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderLeftWidth: 0,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  scanInstruction: {
    position: 'absolute',
    bottom: hp(12),
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
    color: colors.background,
    textAlign: 'center',
    backgroundColor: colors.text,
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 20,
  },
  controlsContainerOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: hp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  galleryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: hp(6.15),
    height: hp(6.15),
    borderRadius: hp(6.15),
    backgroundColor: colors.background,
    borderWidth: wp(1.23),
    borderColor: colors.primary,
  },
  buttonIcon: {
    width: wp(6),
    height: wp(6),
    resizeMode: 'contain',
  },
  cameraIcon: {
    height: hp(3.32),
    width: hp(3.69),
  },
  galleryButtonText: {
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
    color: colors.background,
  },
  captureButton: {
    width: hp(9.23),
    height: hp(9.23),
    borderRadius: hp(10),
    backgroundColor: colors.background,
    borderWidth: wp(1.33),
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenPreviewWrapper: {
    flex: 1,
    backgroundColor: colors.black,
  },
  fullscreenPreview: {
    ...(StyleSheet.absoluteFillObject as any),
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  previewContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  analyzingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analyzingText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    color: colors.background,
    marginTop: hp(2),
  },
  healthyContainer: {
    alignItems: 'center',
    paddingVertical: hp(3),
  },
  successIcon: {
    width: wp(15),
    height: wp(15),
    marginBottom: hp(2),
  },
  healthyTitle: {
    fontSize: fontSize(20),
    fontFamily: fonts.Semibold,
    color: colors.background,
    marginBottom: hp(1),
  },
  healthySubtitle: {
    fontSize: fontSize(14),
    fontFamily: fonts.Regular,
    color: colors.subscriptionBlurText,
  },
  resultsContainer: {
    paddingVertical: hp(2),
  },
  problemCard: {
    backgroundColor: colors.background,
    padding: wp(4.66),
    borderRadius: hp(3.07),
    width: wp(66.66),
    marginRight: wp(6.66),
  },
  problemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  problemName: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.text,
    width: wp(40),
  },
  severityBadge: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: 12,
  },
  severityText: {
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
    color: colors.background,
    textTransform: 'capitalize',
  },
  problemDescription: {
    fontSize: fontSize(12),
    fontFamily: fonts.Semibold,
    color: colors.cancelRed,
    lineHeight: 20,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  permissionIcon: {
    width: wp(20),
    height: wp(20),
    marginBottom: hp(3),
    resizeMode: 'contain',
  },
  permissionTitle: {
    fontSize: fontSize(18),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(1),
    textAlign: 'center',
  },
  permissionSubtitle: {
    fontSize: fontSize(14),
    fontFamily: fonts.Regular,
    textAlign: 'center',
    marginBottom: hp(3),
    lineHeight: 20,
  },
  permissionButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(8),
    borderRadius: 25,
  },
  permissionButtonText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(6),
  },
  loadingText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    color: colors.text,
    textAlign: 'center',
  },
  buttonsContainer: {
    paddingHorizontal: wp(5.33),
  },
  recheckButton: {
    backgroundColor: colors.background,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
  },
  consultButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  ovelStyle: {
    height: hp(42),
    width: wp(65),
    borderWidth: wp(1.23),
    borderRadius: wp(100),
    borderColor: colors.primary,
  },
});
