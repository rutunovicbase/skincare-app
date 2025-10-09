import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { hp, navigate, wp } from '../Helpers/globalFunction';
import { SkinScanCard } from '../Components/common/SkinScanCard';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { SkinScanItem } from '../Constant/types';

export default function SkinScanHistory() {
  const [scanHistory, setScanHistory] = useState<SkinScanItem[]>([]);

  const { user } = useSelector((state: RootState) => state.auth);

  const onPressCard = (item: SkinScanItem) => {
    navigate('Details', { item });
  };

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await firestore()
        .collection('aiConsultation')
        .where('userId', '==', user?.uid)
        .get();

      if (!querySnapshot.empty) {
        const data: SkinScanItem[] = [];
        querySnapshot.forEach(doc => {
          const reviewData = doc.data()?.review as SkinScanItem[];
          if (reviewData) {
            data.push(...reviewData);
          }
        });
        setScanHistory(data);
      }
    };
    getData();
  }, [user?.uid]);

  return (
    <ScrollView style={styles.container}>
      {scanHistory.map((item, index) => (
        <SkinScanCard
          key={index}
          onPress={() => onPressCard(item)}
          item={item}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp(3.07),
    paddingHorizontal: wp(4.26),
  },
});
