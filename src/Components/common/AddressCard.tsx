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
  onSelect,
}: {
  type: string;
  address: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onSelect?: () => void;
}): React.JSX.Element {
  const Wrapper: any = onSelect ? TouchableOpacity : View;

  return (
    <Wrapper style={styles.container} onPress={onSelect}>
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
    </Wrapper>
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
    color: colors.text,
  },
  addressStyle: {
    fontSize: fontSize(15),
    fontFamily: fonts.Medium,
    marginBottom: hp(1.23),
    color: colors.text,
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
