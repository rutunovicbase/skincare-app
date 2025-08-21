import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { hp, wp } from '../Helpers/globalFunction';
import { SkinScanCard } from '../Components/common/SkinScanCard';

export default function SkinScanHistory() {
  return (
    <ScrollView style={styles.container}>
      <SkinScanCard />
      <SkinScanCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(3.07),
    paddingHorizontal: wp(5.33),
  },
});
