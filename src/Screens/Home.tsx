import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../Constant/Colors';
import { fontSize, hp, navigate, wp } from '../Helpers/globalFunction';
import { fonts } from '../Constant/Fonts';
import { icons } from '../Constant/Icons';
import { FlatList } from 'react-native-gesture-handler';

const data = [
  {
    id: '1',
    title: 'Daily tips',
    description:
      'This app made getting expert skin advice so easy! I uploaded my photos, got a quick AI report, and the dermatologist consultation was clear and helpful.',
    icon: icons.ReviewOne,
    name: 'Magan Mathur',
  },
  {
    id: '2',
    title: 'Weekly check-in',
    description:
      'This app made getting expert skin advice so easy! I uploaded my photos, got a quick AI report, and the dermatologist consultation was clear and helpful.',
    icon: icons.ReviewTwo,
    name: 'Magan Mathur',
  },
  {
    id: '3',
    title: 'Monthly goals',
    description:
      'This app made getting expert skin advice so easy! I uploaded my photos, got a quick AI report, and the dermatologist consultation was clear and helpful.',
    icon: icons.ReviewThree,
    name: 'Magan Mathur',
  },
];

function Home() {
  const onPressSubscriptionBanner = () => {
    navigate('Subscription');
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={colors.secondaryPurple}
        barStyle="dark-content"
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Hii! Zeya</Text>
          <TouchableOpacity>
            <Image
              source={icons.notification}
              style={styles.notificationIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          <TouchableOpacity
            style={styles.subscriptionBannerView}
            onPress={onPressSubscriptionBanner}
          >
            <ImageBackground
              source={icons.subscriptionBorder}
              style={styles.subscriptionBorderStyle}
              resizeMode="stretch"
            >
              <Image
                source={icons.subscriptionCrown}
                style={styles.subBannerIcon}
              />
              <Text style={styles.subBannerText}>Access Advanced Features</Text>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.homeBanner1Container}>
            <Image
              source={icons.star}
              style={styles.starIcon1}
              resizeMode="contain"
            />
            <Image
              source={icons.star}
              style={styles.starIcon2}
              resizeMode="contain"
            />
            <Image
              source={icons.star}
              style={styles.starIcon3}
              resizeMode="contain"
            />
            <View>
              <TouchableOpacity style={styles.dailyTipsButton}>
                <Text style={styles.dailyTipsButtonText}>Daily tips</Text>
              </TouchableOpacity>
              <Text style={styles.dailyTipsText}>
                Wash your face four times daily.
              </Text>
            </View>
            <Image source={icons.homeBanner1} style={styles.bannerImage} />
          </View>
          <View style={styles.commonBannerContainer}>
            <ImageBackground
              source={icons.homeBanner2}
              style={styles.bannerImage2}
              resizeMode="stretch"
            >
              <View style={styles.bannerTextContainer}>
                <Text style={styles.banner2Text}>
                  <Text style={styles.banner2TextBold}>1-on-1</Text>{' '}
                  consultation
                </Text>
              </View>

              <ImageBackground
                source={icons.blur1}
                style={styles.blurViewContainer}
                imageStyle={styles.blurRadiusCommon}
              >
                <View style={styles.blurContent}>
                  <Text style={styles.fewClicksText}>
                    Dermatologist is just a few clicks away
                  </Text>
                  <TouchableOpacity style={styles.visitNowButton}>
                    <Text style={styles.visitNowText}>Visit now</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
          <View style={styles.commonBannerContainer}>
            <ImageBackground
              source={icons.homeBanner3}
              style={styles.bannerImage2}
              resizeMode="stretch"
            >
              <View>
                <ImageBackground
                  source={icons.gradientBorder}
                  style={styles.gradientBorder}
                  resizeMode="stretch"
                />
              </View>

              <ImageBackground
                source={icons.blur2}
                style={styles.blurViewBanner3Container}
                imageStyle={styles.blurRadiusCommon}
              >
                <View style={styles.blurContent}>
                  <Text style={styles.fullSkinAnalysisText}>
                    Full Skin Analysis Report
                  </Text>
                  <TouchableOpacity style={styles.visitNowButton}>
                    <Text style={styles.scanNowText}>Scan now</Text>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </ImageBackground>
          </View>
          <View style={styles.subscriptionContainer}>
            <ImageBackground
              source={icons.checksGradient}
              style={styles.checksGradientImage}
              resizeMode="stretch"
            >
              <View style={styles.subscriptionWrapper}>
                <View style={styles.subscriptionCrownContainer}>
                  <Image
                    source={icons.subscriptionCrown}
                    style={styles.subscriptionCrownImage}
                  />
                  <View style={styles.subscriptionPlanContainer}>
                    <Text style={styles.subscriptionPlanText}>Basic</Text>
                  </View>
                </View>
                <Text style={styles.subscriptionPlanDesc}>
                  You have Basic Care Membership
                </Text>
                <View style={styles.subscriptionFeaturesContainer}>
                  <Text style={styles.subscriptionFeaturesText}>
                    Access your exclusive face scan feature to track and improve
                    your skin health
                  </Text>
                  <TouchableOpacity style={styles.upgradeButton}>
                    <Text style={styles.upgradeText}>Upgrade</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.flatListContainer}>
            <FlatList
              data={data}
              bounces={false}
              renderItem={({ item }) => (
                <View style={styles.reviewContainer}>
                  <Image source={item.icon} style={styles.reviewIcon} />
                  <View style={styles.reviewContentMainContainer}>
                    <View style={styles.reviewContentContainer}>
                      <Image
                        source={icons.user}
                        style={styles.reviewUserImage}
                      />
                      <Text style={styles.reviewNameText}>{item.name}</Text>
                    </View>
                    <View style={styles.reviewRatingContainer}>
                      <View style={styles.starContainer}>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Text key={index} style={styles.starIcon}>
                            ★
                          </Text>
                        ))}
                      </View>
                    </View>

                    <Text style={styles.reviewDescriptionText}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToAlignment="center"
              pagingEnabled={true}
              contentContainerStyle={styles.contentContainerStyle}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  header: {
    backgroundColor: colors.secondaryPurple,
    paddingHorizontal: wp(4.26),
    width: '100%',
    height: hp(8.62),
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomEndRadius: hp(1.84),
    borderBottomStartRadius: hp(1.84),
  },
  headerText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(25),
    color: colors.background,
  },
  notificationIcon: {
    width: wp(4.99),
    height: wp(6.14),
  },
  scrollView: {
    flex: 1,
    width: '100%',
    paddingTop: hp(1.84),
  },
  subscriptionBannerView: {
    paddingHorizontal: wp(4.26),
    marginBottom: hp(1.84),
  },
  subscriptionBorderStyle: {
    height: hp(3.07),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blurRadiusCommon: {
    borderBottomLeftRadius: wp(4),
    borderBottomRightRadius: wp(4),
  },
  subBannerIcon: {
    height: wp(4),
    width: wp(4),
    marginRight: wp(2.66),
  },
  subBannerText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  homeBanner1Container: {
    height: hp(18.47),
    backgroundColor: colors.secondaryGray,
    borderRadius: hp(2.46),
    overflow: 'hidden',
    paddingHorizontal: wp(4),
    paddingVertical: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(3.07),
    marginHorizontal: wp(4.26),
  },
  starIcon1: {
    width: wp(15.46),
    height: wp(17.33),
    position: 'absolute',
    transform: [{ rotate: '-15deg' }],
    bottom: -hp(2.38),
    left: wp(6.77),
  },
  starIcon2: {
    width: wp(15.46),
    height: wp(17.33),
    position: 'absolute',
    transform: [{ rotate: '-64.96deg' }],
    left: wp(42.51),
    top: -hp(3.02),
  },
  starIcon3: {
    width: wp(15.46),
    height: wp(17.33),
    position: 'absolute',
    transform: [{ rotate: '-64.96deg' }],
    right: -wp(8.72),
    top: hp(4.12),
    tintColor: colors.secondaryPurple,
  },
  dailyTipsButton: {
    height: hp(2.95),
    width: wp(18.4),
    backgroundColor: colors.secondaryPurple,
    borderRadius: wp(9.2),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(1.84),
  },
  dailyTipsButtonText: {
    fontSize: fontSize(12),
    fontFamily: fonts.Bold,
    color: colors.primary,
  },
  dailyTipsText: {
    width: wp(40),
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.text,
  },
  bannerImage: {
    width: wp(39.46),
    height: hp(16.74),
    resizeMode: 'contain',
  },
  commonBannerContainer: {
    marginBottom: hp(3.07),
    marginHorizontal: wp(4.26),
    alignSelf: 'center',
  },
  bannerImage2: {
    width: wp(89.33),
    height: hp(27.46),
  },
  bannerTextContainer: {
    paddingHorizontal: wp(4),
    paddingTop: hp(4.55),
  },
  banner2Text: {
    fontSize: fontSize(32),
    width: wp(48.8),
    fontFamily: fonts.Bold,
    color: colors.text,
  },
  banner2TextBold: {
    fontSize: fontSize(32),
    fontFamily: fonts.ExtraBold,
    color: colors.secondaryPurple,
  },
  blurViewContainer: {
    width: '100%',
    height: hp(9.23),
    position: 'absolute',
    bottom: 0,
  },
  blurContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(4.26),
  },
  blurView: {
    flex: 1,
    paddingHorizontal: wp(4.26),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fewClicksText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    width: wp(51.46),
    color: colors.text,
  },
  visitNowButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(23.2),
    height: hp(3.57),
    backgroundColor: colors.primary,
    borderRadius: wp(100),
  },
  scanNowText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    color: colors.text,
  },
  visitNowText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Semibold,
    color: colors.text,
  },
  blurViewBanner3Container: {
    width: '100%',
    height: hp(6.15),
    position: 'absolute',
    bottom: 0,
  },
  fullSkinAnalysisText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.background,
  },
  gradientBorder: {
    height: hp(3.07),
    width: wp(16.53),
    marginTop: hp(0.98),
    marginLeft: wp(4),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(2.66),
  },
  aiText: {
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    color: colors.background,
  },
  subscriptionContainer: {
    height: hp(21.3),
    borderRadius: wp(5.33),
    overflow: 'hidden',
    backgroundColor: colors.secondaryGray,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: wp(4.26),
  },
  checksGradientImage: {
    height: '100%',
    width: '100%',
  },
  subscriptionWrapper: {
    padding: wp(4),
  },
  subscriptionCrownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: hp(1.33),
  },
  subscriptionCrownImage: {
    height: wp(14.66),
    width: wp(14.66),
  },
  subscriptionPlanContainer: {
    paddingHorizontal: wp(2.66),
    paddingVertical: wp(1.33),
    borderRadius: wp(2.66),
    backgroundColor: colors.secondaryPurple,
  },
  subscriptionPlanText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(15),
    color: colors.primary,
  },
  subscriptionPlanDesc: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(16),
    color: colors.black,
  },
  subscriptionFeaturesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  subscriptionFeaturesText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(12),
    color: colors.textRGBA,
    width: wp(51.2),
    marginTop: wp(1.33),
    lineHeight: wp(4.26),
  },
  upgradeButton: {
    paddingHorizontal: wp(2.66),
    paddingVertical: wp(1.33),
    backgroundColor: colors.primary,
    borderRadius: wp(2.66),
  },
  upgradeText: {
    fontFamily: fonts.Semibold,
    fontSize: fontSize(15),
    color: colors.text,
  },
  flatListContainer: {
    marginBottom: hp(9.15),
  },
  reviewContainer: {
    width: wp(68),
    borderRadius: wp(5.33),
    backgroundColor: colors.background,
    marginHorizontal: wp(4),
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  reviewIcon: {
    height: hp(17.24),
    width: '100%',
    borderTopLeftRadius: wp(5.33),
    borderTopRightRadius: wp(5.33),
    resizeMode: 'stretch',
  },
  reviewContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(2.46),
  },
  reviewUserImage: {
    width: wp(6.66),
    height: wp(6.66),
    borderRadius: wp(6.66),
    marginRight: wp(4),
  },
  reviewContentMainContainer: {
    paddingHorizontal: wp(4.26),
  },
  reviewNameText: {
    fontFamily: fonts.Medium,
    fontSize: fontSize(12),
    color: colors.text,
  },
  reviewRatingContainer: {
    marginTop: hp(1.23),
  },
  starContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    color: '#f5a623',
    fontSize: 14,
  },
  reviewDescriptionText: {
    marginTop: hp(1.72),
    fontSize: fontSize(12),
    fontFamily: fonts.Medium,
    marginBottom: hp(1.23),
    color: colors.text,
  },
  contentContainerStyle: {
    paddingVertical: hp(3.07),
  },
});

export default Home;
