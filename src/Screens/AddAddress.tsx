import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { fontSize, hp, wp } from '../Helpers/globalFunction';
import { colors } from '../Constant/Colors';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../Components/common/Header';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { navigate } from '../Helpers/globalFunction';
import { useRoute } from '@react-navigation/native';

export default function AddAddress(): React.JSX.Element {
  const route = useRoute<any>();
  const [selectedType, setSelectedType] = useState('Home');
  const [line1, setLine1] = useState('');
  const [street, setStreet] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [originalAddress, setOriginalAddress] = useState<any | null>(null);

  const user = useSelector((s: RootState) => s.auth.user);

  const canSave = useMemo(() => {
    return (
      !!user?.uid &&
      line1.trim().length > 0 &&
      street.trim().length > 0 &&
      pincode.trim().length > 0 &&
      city.trim().length > 0 &&
      stateName.trim().length > 0 &&
      receiverName.trim().length > 0 &&
      receiverPhone.trim().length >= 6
    );
  }, [
    user?.uid,
    line1,
    street,
    pincode,
    city,
    stateName,
    receiverName,
    receiverPhone,
  ]);

  useEffect(() => {
    const addr = (route as any)?.params?.address;
    if (addr) {
      setOriginalAddress(addr);
      setSelectedType(addr.type || 'Home');
      setLine1(addr.line1 || '');
      setStreet(addr.street || '');
      setLandmark(addr.landmark || '');
      setPincode(addr.pincode || '');
      setCity(addr.city || '');
      setStateName(addr.state || '');
      setReceiverName(addr.receiverName || '');
      setReceiverPhone(addr.receiverPhone || '');
    }
  }, [route]);

  const onSave = useCallback(async () => {
    if (!canSave || !user?.uid || isSaving) return;
    try {
      setIsSaving(true);
      const newAddress = {
        type: selectedType,
        line1: line1.trim(),
        street: street.trim(),
        landmark: landmark.trim() || null,
        pincode: pincode.trim(),
        city: city.trim(),
        state: stateName.trim(),
        receiverName: receiverName.trim(),
        receiverPhone: receiverPhone.trim(),
        createdAt: new Date().toISOString(),
      };

      const ref = firestore().collection('users').doc(user.uid);
      if (originalAddress) {
        await ref.update({
          addresses: firestore.FieldValue.arrayRemove(originalAddress as any),
        });
        await ref.set(
          {
            addresses: firestore.FieldValue.arrayUnion(newAddress as any),
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        );
      } else {
        await ref.set(
          {
            addresses: firestore.FieldValue.arrayUnion(newAddress as any),
            updatedAt: new Date().toISOString(),
          },
          { merge: true },
        );
      }

      navigate('Address');
    } catch (_) {
    } finally {
      setIsSaving(false);
    }
  }, [
    canSave,
    user?.uid,
    isSaving,
    selectedType,
    line1,
    street,
    landmark,
    pincode,
    city,
    stateName,
    receiverName,
    receiverPhone,
    originalAddress,
  ]);

  const type = ['Home', 'Office', 'Other'];
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={originalAddress ? 'Edit address' : 'Add address'}
        isPadding
      />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>
            House no, Flat, building, apartment.
          </Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
            value={line1}
            onChangeText={setLine1}
            placeholder="248 Sudden Lane"
          />
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Street, area, village</Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
            value={street}
            onChangeText={setStreet}
            placeholder="Milnathort"
          />
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Landmark</Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
            value={landmark}
            onChangeText={setLandmark}
            placeholder="G31 5EN"
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.commonContainer, { width: wp(42.13) }]}>
            <Text style={styles.commonFieldTitle}>Pincode</Text>
            <TextInput
              style={styles.commonInputStyle}
              placeholderTextColor={colors.borderGray}
              value={pincode}
              onChangeText={setPincode}
              placeholder="395005"
            />
          </View>
          <View style={[styles.commonContainer, { width: wp(42.13) }]}>
            <Text style={styles.commonFieldTitle}>Town/City</Text>
            <TextInput
              style={styles.commonInputStyle}
              placeholderTextColor={colors.borderGray}
              value={city}
              onChangeText={setCity}
              placeholder="Surat"
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.commonContainer, { width: wp(42.13) }]}>
            <Text style={styles.commonFieldTitle}>State</Text>
            <TextInput
              style={styles.commonInputStyle}
              placeholderTextColor={colors.borderGray}
              value={stateName}
              onChangeText={setStateName}
              placeholder="Gujarat"
            />
          </View>
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Receiver’s name</Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
            value={receiverName}
            onChangeText={setReceiverName}
            placeholder="Mathur"
          />
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Receiver’s mobile no</Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
            keyboardType="number-pad"
            value={receiverPhone}
            onChangeText={setReceiverPhone}
            placeholder="9876543210"
          />
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Save as</Text>
          <View style={styles.rowContainer}>
            {type?.map(item => {
              return (
                <TouchableOpacity
                  style={[
                    styles.typeButtonStyle,
                    {
                      backgroundColor:
                        selectedType === item
                          ? colors.secondaryPurple
                          : colors.background,
                    },
                  ]}
                  onPress={() => {
                    setSelectedType(item);
                  }}
                >
                  <Text
                    style={[
                      styles.typeText,
                      {
                        color:
                          selectedType === item
                            ? colors.background
                            : colors.borderGray,
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <LinearButton
          title="Save"
          style={styles.continueButton}
          textStyle={styles.continueButtonText}
          onPress={onSave}
          disabled={!canSave || isSaving}
        />
      </ScrollView>
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
    paddingTop: hp(0.61),
  },
  commonContainer: {
    marginTop: hp(1.84),
  },
  commonInputStyle: {
    borderWidth: wp(0.23),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    paddingHorizontal: wp(4),
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
  },
  commonFieldTitle: {
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
    marginBottom: hp(1.23),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeButtonStyle: {
    borderWidth: wp(0.23),
    paddingHorizontal: wp(8.93),
    paddingVertical: wp(3.46),
    borderRadius: wp(100),
    borderColor: colors.borderGray,
  },
  typeText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(12),
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginTop: hp(4.92),
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
});
