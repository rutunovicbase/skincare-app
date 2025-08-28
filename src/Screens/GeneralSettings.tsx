import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { hp, navigate, wp } from '../Helpers/globalFunction';
import { Header } from '../Components/common/Header';
import { Menu } from '../Components/common/Menu';
import { icons } from '../Constant/Icons';

export default function GeneralSettings() {
  const onPressLanguage = () => {
    navigate('SelectLanguage');
  };

  const onPressManageSubscription = () => {
    navigate('ManageSubscription');
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Header title="General settings" isPadding />
      <View style={styles.contentContainer}>
        <Menu
          menuName="Notification"
          icon={icons.language}
          iconBackground={colors.primary}
          onPress={onPressLanguage}
          isSwitch
        />
        <Menu
          menuName="Support"
          icon={icons.support}
          iconBackground={colors.primary}
          onPress={onPressLanguage}
        />
        <Menu
          menuName="Language"
          icon={icons.language}
          iconBackground={colors.primary}
          onPress={onPressLanguage}
        />
        <Menu
          menuName="Manage subscription"
          icon={icons.manageSubscription}
          iconBackground={colors.primary}
          onPress={onPressManageSubscription}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingHorizontal: wp(4.26),
    marginTop: hp(2.46),
  },
});
