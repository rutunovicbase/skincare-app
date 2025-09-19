import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { Header } from '../Components/common/Header';
import LinearButton from '../Components/common/LinearButton';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { AddressCard } from '../Components/common/AddressCard';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type UserAddress = {
  type: string;
  line1: string;
  street: string;
  landmark?: string | null;
  pincode: string;
  city: string;
  state: string;
  receiverName: string;
  receiverPhone: string;
  createdAt?: string;
};

export default function Address(): React.JSX.Element {
  const user = useSelector((s: RootState) => s.auth.user);
  const [addresses, setAddresses] = useState<UserAddress[]>([]);

  useEffect(() => {
    if (!user?.uid) return;
    const unsub = firestore()
      .collection('users')
      .doc(user.uid)
      .onSnapshot(snap => {
        const data = snap.data() as any;
        const list = Array.isArray(data?.addresses) ? data.addresses : [];
        setAddresses(list);
      });
    return () => unsub();
  }, [user?.uid]);

  const onPressAddAddress = () => {
    navigate('AddAddress');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Address" isPadding />
      <View style={styles.mainContainer}>
        <LinearButton
          title="Add new address"
          style={styles.addAddressButton}
          textStyle={styles.addAddressButtonText}
          onPress={onPressAddAddress}
        />
        <View style={styles.orContainer}>
          <View style={styles.dividerStyle} />
          <Text style={styles.orText}>Or</Text>
          <View style={styles.dividerStyle} />
        </View>
        <Text style={styles.chooseFromSaveText}>Choose From saved Address</Text>
        <FlatList
          data={addresses}
          keyExtractor={(item, index) => `${item.receiverPhone}-${index}`}
          renderItem={({ item }) => (
            <AddressCard
              type={item.type}
              address={`${item.line1}, ${item.street}${
                item.landmark ? `, ${item.landmark}` : ''
              }, ${item.city}, ${item.state}. ${item.pincode}`}
              onEdit={() => navigate('AddAddress', { address: item })}
              onDelete={async () => {
                if (!user?.uid) return;
                try {
                  await firestore()
                    .collection('users')
                    .doc(user.uid)
                    .update({ addresses: firestore.FieldValue.arrayRemove(item as any) });
                } catch (_) {}
              }}
            />
          )}
          ListEmptyComponent={() => (
            <Text
              style={{
                flex: 1,
                fontFamily: fonts.Medium,
                color: colors.lightText,
              }}
            >
              No saved addresses yet.
            </Text>
          )}
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
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp(4.26),
  },
  addAddressButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
    marginTop: hp(3.07),
  },
  addAddressButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.23),
  },
  dividerStyle: {
    flex: 1,
    height: wp(0.23),
    backgroundColor: colors.subheadingText,
  },
  orText: {
    marginHorizontal: wp(4.26),
    fontFamily: fonts.Regular,
    fontSize: fontSize(12),
    color: colors.lightText,
    lineHeight: fontSize(16),
  },
  chooseFromSaveText: {
    fontSize: fontSize(18),
    fontFamily: fonts.Semibold,
    marginBottom: hp(1.84),
  },
});
