import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from 'react-native-reanimated';
import { colors } from '../../Constant/Colors';
import { hp, navigate, wp } from '../../Helpers/globalFunction';
import {
  AnimatedTabBarIconProps,
  TabBarProps,
  TabButtonProps,
} from '../../Constant/types';

const AnimatedTabBarIcon: React.FC<AnimatedTabBarIconProps> = ({
  focused,
  icon,
}) => {
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.1 : 1, { damping: 10 });
    translateY.value = withSpring(focused ? -2 : 0, { damping: 10 });
  }, [focused, scale, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[styles.tabIconContainer, animatedStyle]}>
      <Image
        source={focused ? icon.filled : icon.outline}
        style={styles.tabIcon}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const TabButton: React.FC<TabButtonProps> = ({ onPress, icon }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.tabButton,
        { opacity: pressed ? 0.7 : 1 },
      ]}
    >
      {icon}
    </Pressable>
  );
};

const CustomTabBar = ({ state, descriptors }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            navigate(route.name);
          };

          return (
            <TabButton
              key={route.key}
              onPress={onPress}
              icon={
                <AnimatedTabBarIcon focused={isFocused} icon={options.icon} />
              }
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    height: hp(6.15),
    backgroundColor: colors.secondaryGray,
    borderRadius: hp(6.16),
    marginHorizontal: wp(5.33),
    marginBottom: hp(1.23),
    borderWidth: 1,
    borderColor: colors.lightBorder,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconContainer: {
    width: wp(12),
    height: wp(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: wp(6.66),
    height: wp(6.66),
  },
});

export default CustomTabBar;
