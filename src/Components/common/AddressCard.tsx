import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { colors } from '../../Constant/Colors';
import { fonts } from '../../Constant/Fonts';

export function AddressCard({
  type,
  address,
  onEdit,
  onDelete,
}: {
  type: string;
  address: string;
  onEdit?: () => void;
  onDelete?: () => void;
}): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.addressTypeText}>{type}</Text>
      <Text style={styles.addressStyle}>{address}</Text>
      <View style={styles.editContainer}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editDeleteText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.editDeleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp(4),
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(5.33),
    elevation: 3,
    marginBottom: hp(1.84),
  },
  addressTypeText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  addressStyle: {
    fontSize: fontSize(15),
    fontFamily: fonts.Medium,
    marginBottom: hp(1.23),
  },
  editContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  editDeleteText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.secondaryPurple,
  },
});
