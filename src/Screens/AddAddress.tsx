import React, { useState } from 'react';
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

export default function AddAddress(): React.JSX.Element {
  const [selectedType, setSelectedType] = useState('Home');

  const type = ['Home', 'Office', 'Other'];
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Add address" isPadding />
      <ScrollView style={styles.mainContainer}>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>
            House no, Flat, building, apartment.
          </Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
          />
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Street, area, village</Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
          />
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Landmark</Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
          />
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.commonContainer, { width: wp(42.13) }]}>
            <Text style={styles.commonFieldTitle}>Pincode</Text>
            <TextInput
              style={styles.commonInputStyle}
              placeholderTextColor={colors.borderGray}
            />
          </View>
          <View style={[styles.commonContainer, { width: wp(42.13) }]}>
            <Text style={styles.commonFieldTitle}>Town/City</Text>
            <TextInput
              style={styles.commonInputStyle}
              placeholderTextColor={colors.borderGray}
            />
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={[styles.commonContainer, { width: wp(42.13) }]}>
            <Text style={styles.commonFieldTitle}>State</Text>
            <TextInput
              style={styles.commonInputStyle}
              placeholderTextColor={colors.borderGray}
            />
          </View>
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Receiver’s name</Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
          />
        </View>
        <View style={styles.commonContainer}>
          <Text style={styles.commonFieldTitle}>Receiver’s mobile no</Text>
          <TextInput
            style={styles.commonInputStyle}
            placeholderTextColor={colors.borderGray}
            keyboardType="number-pad"
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
          onPress={() => {}}
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
    marginTop: hp(1.84),
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
});
