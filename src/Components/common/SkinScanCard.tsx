import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../Constant/Colors';
import { fontSize, hp, wp } from '../../Helpers/globalFunction';
import { fonts } from '../../Constant/Fonts';
import { icons } from '../../Constant/Icons';
import moment from 'moment';

export function SkinScanCard({
  onPress,
  item,
}: {
  onPress: () => void;
  item: any;
}) {
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
      <View style={styles.titleView}>
        <Text style={styles.title}>Face skin scan</Text>
        <Image source={icons.crossArrow} style={styles.crossArrowIcon} />
      </View>
      <Text style={styles.date}>
        {moment(item.createdAt).format('DD MMM YYYY, hh:mm A')}
      </Text>
      <View style={styles.problemView}>
        {item?.aiConsultation
          ?.slice(0, 2)
          .map((problem: any, index: number) => (
            <Text key={index} style={styles.problemText}>
              {problem?.problem}
            </Text>
          ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondaryGray,
    borderRadius: wp(5.33),
    padding: wp(4),
    marginBottom: hp(2.46),
    elevation: 3,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(0.61),
  },
  title: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  crossArrowIcon: {
    height: wp(6.66),
    width: wp(6.66),
  },
  date: {
    fontSize: fontSize(12),
    color: colors.text,
    fontFamily: fonts.Semibold,
    marginBottom: hp(1.23),
  },
  problemView: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  problemText: {
    backgroundColor: colors.secondaryPurple,
    borderWidth: wp(0.26),
    fontSize: fontSize(12),
    fontFamily: fonts.Semibold,
    color: colors.background,
    paddingHorizontal: wp(2.66),
    paddingVertical: wp(1.33),
    borderRadius: wp(100),
    marginRight: wp(2.66),
  },
});
