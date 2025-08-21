import React from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { colors } from '../../Constant/Colors';
import { fonts } from '../../Constant/Fonts';

export function Menu({
  menuName,
  icon,
  iconBackground,
  onPress,
}: {
  menuName: string;
  icon: ImageProps['source'];
  iconBackground: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuContainer} onPress={onPress}>
      <Text style={styles.menuItem}>{menuName}</Text>
      <View
        style={[styles.iconBackground, { backgroundColor: iconBackground }]}
      >
        <Image
          source={icon}
          style={styles.menuIcon}
          resizeMode="contain"
          tintColor={colors.black}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    paddingHorizontal: wp(4),
    borderRadius: wp(100),
    borderWidth: wp(0.26),
    borderColor: colors.borderGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.84),
  },
  menuItem: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    paddingVertical: hp(1.23),
  },
  menuIcon: {
    height: wp(4),
    width: wp(4),
  },
  iconBackground: {
    height: wp(6.66),
    width: wp(6.66),
    borderRadius: wp(4),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
