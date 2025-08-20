import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../Constant/Colors';
import { wp, hp, fontSize } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import LinearButton from '../Components/common/LinearButton';
import DateTimePicker, {
  CalendarDay,
  CalendarMonth,
  CalendarYear,
  DateType,
} from 'react-native-ui-datepicker';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useTranslation } from 'react-i18next';

type Props = {
  onContinue: () => void;
};

const MonthComponent = (month: CalendarMonth) => (
  <View
    style={[
      styles.calendarItemContainer,
      month?.isSelected && styles.selectedItem,
    ]}
  >
    <Text style={styles.datePickerLabel}>{month.name.full}</Text>
  </View>
);

const YearComponent = (year: CalendarYear) => (
  <View
    style={[
      styles.calendarItemContainer,
      year?.isSelected && styles.selectedItem,
    ]}
  >
    <Text style={styles.datePickerLabel}>{year.number}</Text>
  </View>
);

const DayComponent = (day: CalendarDay) => (
  <View
    style={[styles.dayItemContainer, day?.isSelected && styles.selectedItem]}
  >
    <Text style={styles.datePickerLabel}>{day.text}</Text>
  </View>
);

export default function Birthdate({ onContinue }: Props) {
  const [birthdate, setBirthdate] = useState<DateType>();
  const { language } = useSelector((state: RootState) => state.language);

  const { t } = useTranslation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('ShareBirthdate')}</Text>
        <DateTimePicker
          mode="single"
          date={birthdate}
          weekdaysFormat="short"
          locale={language}
          onChange={({ date }: { date: DateType }) => {
            setBirthdate(date as string);
          }}
          styles={{
            year_label: styles.datePickerLabel,
            month_label: styles.datePickerLabel,
            day_label: styles.datePickerLabel,
            weekday_label: styles.datePickerLabel,
            header: [styles.datePickerLabel, styles.datePickerHeader],
            month_selector_label: [
              styles.datePickerLabel,
              styles.monthSelectorLabel,
            ],
            year_selector_label: styles.datePickerLabel,
          }}
          style={styles.datePicker}
          weekdaysHeight={hp(4)}
          components={{
            IconPrev: (
              <Image source={icons.arrow} style={styles.navigationIcon} />
            ),
            IconNext: (
              <Image
                source={icons.arrow}
                style={[styles.navigationIcon, styles.nextIcon]}
              />
            ),
            Month: MonthComponent,
            Year: YearComponent,
            Day: DayComponent,
          }}
        />
      </View>

      <View style={styles.infoContainer}>
        <Image source={icons.info} style={styles.infoIcon} />
        <Text style={styles.infoText}>{t('CannotEditBirthdate')} </Text>
      </View>

      <LinearButton
        title={t('Continue')}
        onPress={onContinue}
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginHorizontal: wp(5.33),
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSize(22),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(2.46),
    paddingRight: wp(36.8),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.23),
  },
  infoIcon: {
    width: wp(6.66),
    height: wp(6.66),
    marginRight: wp(2),
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Semibold,
    color: colors.textRGBA,
  },
  continueButton: {
    backgroundColor: colors.primary,
    paddingVertical: hp(1.29),
    borderRadius: wp(100),
    marginBottom: hp(1.23),
  },
  continueButtonText: {
    textAlign: 'center',
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
  },
  datePickerLabel: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(14),
    color: colors.text,
  },
  datePicker: {
    backgroundColor: colors.background,
    borderRadius: wp(2.13),
    borderColor: colors.primary,
    borderWidth: wp(0.26),
  },
  datePickerHeader: {
    borderBottomColor: colors.primary,
    borderBottomWidth: wp(0.26),
  },
  monthSelectorLabel: {
    marginRight: wp(2),
  },
  navigationIcon: {
    width: wp(4.26),
    height: wp(4.26),
  },
  nextIcon: {
    transform: [{ rotate: '180deg' }],
  },
  calendarItemContainer: {
    height: hp(4.92),
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(26.66),
    borderRadius: wp(100),
  },
  dayItemContainer: {
    height: hp(4.92),
    justifyContent: 'center',
    alignItems: 'center',
    width: hp(4.92),
    borderRadius: hp(4.92),
  },
  selectedItem: {
    backgroundColor: colors.primary,
    borderRadius: wp(100),
  },
});
