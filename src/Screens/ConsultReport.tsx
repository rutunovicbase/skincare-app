import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Consultation } from '../Constant/types';
import { Header } from '../Components/common/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';

type RootStackParamList = {
  ConsultReport: { item: Consultation };
};

type ConsultReportRouteProp = RouteProp<RootStackParamList, 'ConsultReport'>;

export default function ConsultReport(): React.JSX.Element {
  const route = useRoute<ConsultReportRouteProp>();
  const { item } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Consult details" isPadding />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
