import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { Header } from '../Components/common/Header';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { cancelReasons } from '../Constant/Constant';
import LinearButton from '../Components/common/LinearButton';

export default function CancelOrder(): React.JSX.Element {
  const [selectedItems, setSelectedItems] = useState<string>('');

  const handleOnContinue = () => {
    navigate('Success', {
      title: 'Order Cancelation Complete',
      subTitle: 'Your subscription has been successfully canceled',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header isPadding title="Cancel order" />
      <View style={styles.content}>
        <Text style={styles.title}>
          Please share the reason for canceling your order
        </Text>
        {cancelReasons?.map(item => (
          <TouchableOpacity
            style={[
              styles.reasonsContainer,
              selectedItems === item.title && styles.selectedReasonContainer,
            ]}
            key={item.key}
            onPress={() => {
              setSelectedItems(item.title);
            }}
          >
            <Text
              style={[
                styles.reasonsText,
                selectedItems === item.title && styles.selectedReasonsText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <LinearButton
        title="Continue"
        onPress={handleOnContinue}
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: wp(4.26),
    marginTop: hp(3.07),
  },
  title: {
    fontSize: fontSize(22),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(3.07),
    paddingRight: wp(19.2),
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
  reasonsContainer: {
    height: hp(4.92),
    paddingHorizontal: wp(4),
    borderWidth: wp(0.26),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    justifyContent: 'center',
    marginBottom: hp(1.23),
  },
  selectedReasonContainer: {
    backgroundColor: colors.primary,
  },
  selectedReasonsText: {
    fontFamily: fonts.Semibold,
  },
  reasonsText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
  },
});
