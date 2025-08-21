import React, { useEffect } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../Constant/Icons';
import { Menu } from '../Components/common/Menu';

function Profile() {
  const fadeAnim = useSharedValue(0);
  const slideAnim = useSharedValue(50);

  useEffect(() => {
    fadeAnim.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    slideAnim.value = withSpring(0, {
      damping: 15,
      stiffness: 100,
    });
  }, [fadeAnim, slideAnim]);

  const headerStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ translateY: slideAnim.value }],
  }));

  const onPressProfileDetails = () => {
    navigate('ProfileDetails');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Animated.View style={[styles.header, headerStyle]}>
        <Text style={styles.title}>Profile</Text>
      </Animated.View>
      <View style={styles.profilePhotoContainer}>
        <Image source={icons.user} style={styles.profilePhoto} />
        <TouchableOpacity style={styles.editButton}>
          <Image source={icons.edit} style={styles.editIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.profileName}>Magan Mathur</Text>
      <ScrollView
        style={styles.menuOptionsContainer}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitleText}>User personal</Text>
        <Menu
          menuName="Personal info"
          icon={icons.profileRound}
          iconBackground={colors.primary}
          onPress={onPressProfileDetails}
        />
        <Menu
          menuName="Daily Lifestyle Insights"
          icon={icons.lifestyle}
          iconBackground={colors.primary}
        />
        <Text style={styles.sectionTitleText}>Preferences</Text>
        <Menu
          menuName="General settings"
          icon={icons.settings}
          iconBackground={colors.primary}
        />
        <Menu
          menuName="Term & Condition"
          icon={icons.terms}
          iconBackground={colors.primary}
        />
        <Menu
          menuName="Rate us"
          icon={icons.rateStar}
          iconBackground={colors.primary}
        />
        <Text style={styles.sectionTitleText}>Account settings</Text>
        <Menu
          menuName="Log out"
          icon={icons.logout}
          iconBackground={colors.primary}
        />
        <Menu
          menuName="Delete account"
          icon={icons.delete}
          iconBackground={colors.primary}
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
  header: {
    backgroundColor: colors.background,
    marginTop: hp(1.23),
    marginBottom: hp(3.07),
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize(22),
    fontFamily: fonts.Semibold,
    color: colors.black,
  },
  profilePhotoContainer: {
    height: hp(12.31),
    width: hp(12.31),
    backgroundColor: colors.primaryBorder,
    borderRadius: hp(100),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.84),
  },
  profilePhoto: {
    height: hp(9.85),
    width: hp(9.85),
  },
  editButton: {
    position: 'absolute',
    right: wp(1.33),
    bottom: hp(0.24),
  },
  editIcon: {
    height: hp(3.07),
    width: hp(3.07),
  },
  profileName: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.text,
    textAlign: 'center',
    marginBottom: hp(1.84),
  },
  sectionTitleText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(22),
    color: colors.black,
    marginBottom: hp(1.84),
    marginTop: hp(1.23),
  },
  menuOptionsContainer: {
    paddingHorizontal: wp(4.26),
  },
  contentContainerStyle: {
    paddingBottom: hp(7.38),
  },
});

export default Profile;
