import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../Components/common/Header';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../Constant/Colors';
import { fontSize, hp, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';

type RootStackParamList = {
  DiseaseDetails: { item: string };
};

type DiseaseDetailsRouteProp = RouteProp<RootStackParamList, 'DiseaseDetails'>;

export default function DiseaseDetails(): React.JSX.Element {
  const route = useRoute<DiseaseDetailsRouteProp>();

  const symptoms = [
    'Red, inflamed bumps on the skin',
    'Whiteheads (closed clogged pores)',
    'Blackheads (open clogged pores)',
    'Small pus-filled lesions (pustules)',
    'Painful, deep lumps (nodules or cysts)',
    'Oily or greasy skin surface',
    'Skin tenderness or irritation',
    'Dark spots or scars left after healing',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title={route.params.item} isPadding />
      <View style={styles.mainContainer}>
        <Text style={styles.symptomsText}>Symptoms</Text>
        <View style={styles.problemDetailsContainer}>
          {symptoms?.map((item, index) => (
            <View key={index}>
              <Text style={styles.analysisBullet}>• {item}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.causesText}>Causes</Text>
        <View style={styles.problemDetailsContainer}>
          {symptoms?.map((item, index) => (
            <View key={index}>
              <Text style={styles.analysisBullet}>• {item}</Text>
            </View>
          ))}
        </View>
      </View>
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
  symptomsText: {
    marginTop: hp(3.07),
    fontFamily: fonts.Semibold,
    fontSize: fontSize(22),
  },
  problemDetailsContainer: {
    backgroundColor: colors.primary,
    borderRadius: wp(5.33),
    marginBottom: hp(3.07),
    marginTop: hp(1.84),
    padding: wp(4),
  },
  analysisBullet: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(16),
    color: colors.black,
    marginTop: hp(0.98),
    lineHeight: hp(2.5),
  },
  causesText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(22),
  },
});
