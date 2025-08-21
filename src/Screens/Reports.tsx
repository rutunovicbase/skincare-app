import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import {
  SceneMap,
  TabView,
  TabBar,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../Constant/Colors';
import { fonts } from '../Constant/Fonts';
import { fontSize, hp, wp } from '../Helpers/globalFunction';

import ConsultHistory from './ConsultHistory';
import SkinScanHistory from './SkinScanHistory';

type Route = {
  key: string;
  title: string;
};

const routes: Route[] = [
  { key: 'SkinScan', title: 'Skin Scan' },
  { key: 'Consult', title: 'Consult' },
];

const renderScene = SceneMap({
  SkinScan: SkinScanHistory,
  Consult: ConsultHistory,
});

const Reports = () => {
  const [index, setIndex] = useState(0);

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

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<Route> },
  ) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.tabIndicator}
      activeColor={colors.text}
      inactiveColor={colors.text}
      renderTabBarItem={({ route }) => (
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => props.jumpTo(route.key)}
          activeOpacity={0.7}
        >
          <Text style={styles.tabText}>{route.title}</Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Animated.View style={[styles.header, headerStyle]}>
        <Text style={styles.title}>History</Text>
      </Animated.View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        style={styles.tabView}
      />
    </SafeAreaView>
  );
};

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
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: colors.secondaryGray,
    elevation: 0,
    shadowOpacity: 0,
    height: hp(6.15),
    width: wp(69.33),
    alignSelf: 'center',
    borderRadius: wp(100),
    marginBottom: hp(1),
  },
  tabIndicator: {
    backgroundColor: colors.primary,
    height: hp(4.92),
    borderRadius: wp(100),
    marginBottom: wp(1.33),
    marginLeft: wp(1.33),
    width: wp(32),
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: wp(32),
    height: hp(4.92),
    marginTop: wp(1.33),
    marginLeft: wp(1.33),
  },
  tabText: {
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
    textAlign: 'center',
    color: colors.text,
  },
});

export default Reports;
