import React, { useState } from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  Switch,
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
  isSwitch,
}: {
  menuName: string;
  icon: ImageProps['source'];
  iconBackground: string;
  onPress?: () => void;
  isSwitch?: boolean;
}) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <TouchableOpacity style={styles.menuContainer} onPress={onPress}>
      <Text style={styles.menuItem}>{menuName}</Text>
      {!isSwitch ? (
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
      ) : (
        <Switch
          trackColor={{ false: colors.borderGray, true: colors.primary }}
          thumbColor={colors.black}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      )}
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
    color: colors.text,
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
