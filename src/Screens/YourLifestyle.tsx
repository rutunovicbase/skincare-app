import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../Constant/Colors';
import { wp, hp, fontSize, goBack } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import LinearButton from '../Components/common/LinearButton';
import { yourLifestyle as defaultLifestyle } from '../Constant/Constant';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../Components/common/Header';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

type Props = {
  onContinue?: () => void;
};

export default function YourLifestyle({ onContinue }: Props) {
  const userInfo = useSelector((state: RootState) => state.auth.user);
  const language = useSelector((state: RootState) => state.language.language);
  const cachedList = useSelector(
    (state: RootState) => state.remoteConfig.lists.yourLifestyle?.[language],
  );
  const [selectedId, setSelectedId] = useState<string>(
    userInfo?.lifestyle || '',
  );
  const [list, setList] = useState(defaultLifestyle);

  const { t } = useTranslation();

  const handleOnContinue = async () => {
    if (selectedId) {
      try {
        const currentUser = auth().currentUser;
        if (currentUser) {
          await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .set({ lifestyle: selectedId }, { merge: true });
        }
      } catch (e) {}
      if (onContinue) {
        onContinue();
      } else {
        goBack();
      }
    }
  };

  useEffect(() => {
    if (cachedList && (cachedList as any).length > 0) {
      setList(cachedList as any);
    } else {
      setList(defaultLifestyle);
    }
  }, [cachedList]);

  const margin = { marginTop: !onContinue ? hp(7.38) : 0 };

  return (
    <SafeAreaView style={styles.mainContainer}>
      {!onContinue && <Header isPadding={false} />}
      <View style={[styles.content, margin]}>
        <Text style={styles.title}>{t('YourLifestyle')}</Text>
        <Text style={styles.subTitle}>{t('TellUsAboutYourSleepRoutine')}</Text>

        {list?.map(item => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.lifestyleItemContainer,
              selectedId === item.id && styles.selectedLifestyleItemContainer,
            ]}
            onPress={() => setSelectedId(item.id)}
          >
            <Text
              style={[
                styles.lifestyleItemText,
                selectedId === item.id && styles.selectedLifestyleItemText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <LinearButton
        title={onContinue ? t('Continue') : 'Save'}
        onPress={handleOnContinue}
        style={styles.continueButton}
        textStyle={styles.continueButtonText}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: wp(4.26),
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: fontSize(22),
    fontFamily: fonts.Semibold,
    color: colors.text,
    marginBottom: hp(3.07),
    paddingRight: wp(19.2),
  },
  subTitle: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    marginBottom: hp(2.46),
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
  lifestyleItemContainer: {
    height: hp(4.92),
    paddingHorizontal: wp(4),
    borderWidth: wp(0.26),
    borderColor: colors.borderGray,
    borderRadius: wp(100),
    justifyContent: 'center',
    marginBottom: hp(1.23),
  },
  selectedLifestyleItemContainer: {
    backgroundColor: colors.primary,
  },
  selectedLifestyleItemText: {
    fontFamily: fonts.Semibold,
  },
  lifestyleItemText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(14),
  },
});
