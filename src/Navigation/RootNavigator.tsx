import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '../Helpers/globalFunction';
import Login from '../Screens/Login';
import OTPVerification from '../Screens/OTPVarification';
import SelectLanguage from '../Screens/SelectLanguage';
import Onboarding from '../Screens/Onboarding';
import OnboardingFlow from '../Screens/OnboardingFlow';
import AddPhoto from '../Screens/AddPhoto';
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import CustomTabBar from '../Components/common/CustomTabBar';
import { CustomTabNavigationOptions } from '../Constant/types';
import Home from '../Screens/Home';
import { icons } from '../Constant/Icons';
import Reports from '../Screens/Reports';
import Scan from '../Screens/Scan';
import Orders from '../Screens/Orders';
import Profile from '../Screens/Profile';
import Subscription from '../Screens/Subscription';
import ProfileDetails from '../Screens/ProfileDetails';
import LifestyleInsights from '../Screens/LifestyleInsights';
import YourLifestyle from '../Screens/YourLifestyle';
import DietaryPreferences from '../Screens/DietaryPreferences';
import YourStressLevel from '../Screens/YourStressLevel';
import GeneralSettings from '../Screens/GeneralSettings';
import ConsultReport from '../Screens/ConsultReport';
import Details from '../Screens/Details';
import DiseaseDetails from '../Screens/DiseaseDetails';
import ManageSubscription from '../Screens/ManageSubscription';
import OrderDetails from '../Screens/OrderDetails';
import OrderReview from '../Screens/OrderReview';
import Address from '../Screens/Address';
import AddAddress from '../Screens/AddAddress';
import OrderPreview from '../Screens/OrderPreview';
import CancelOrder from '../Screens/CancelOrder';
import Success from '../Screens/Success';

const Tab = createBottomTabNavigator();

export const tabIcons = {
  home: {
    filled: icons.homeFill,
    outline: icons.home,
  },
  reports: {
    filled: icons.reportsFill,
    outline: icons.reports,
  },
  scan: {
    filled: icons.scanFill,
    outline: icons.scan,
  },
  orders: {
    filled: icons.ordersFill,
    outline: icons.orders,
  },
  profile: {
    filled: icons.profileFill,
    outline: icons.profile,
  },
};

const CustomTabBarWrapper = (props: BottomTabBarProps) => (
  <CustomTabBar {...props} />
);

function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={CustomTabBarWrapper}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={
          {
            icon: {
              filled: tabIcons.home.filled,
              outline: tabIcons.home.outline,
            },
            tabBarLabel: 'Home',
          } as CustomTabNavigationOptions
        }
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={
          {
            icon: {
              filled: tabIcons.reports.filled,
              outline: tabIcons.reports.outline,
            },
            tabBarLabel: 'Reports',
          } as CustomTabNavigationOptions
        }
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
        options={
          {
            icon: {
              filled: tabIcons.scan.filled,
              outline: tabIcons.scan.outline,
            },
            tabBarLabel: 'Scan',
          } as CustomTabNavigationOptions
        }
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={
          {
            icon: {
              filled: tabIcons.orders.filled,
              outline: tabIcons.orders.outline,
            },
            tabBarLabel: 'Orders',
          } as CustomTabNavigationOptions
        }
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={
          {
            icon: {
              filled: tabIcons.profile.filled,
              outline: tabIcons.profile.outline,
            },
            tabBarLabel: 'Profile',
          } as CustomTabNavigationOptions
        }
      />
    </Tab.Navigator>
  );
}

function RootNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTPVerification" component={OTPVerification} />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="OnboardingFlow" component={OnboardingFlow} />
        <Stack.Screen name="AddPhoto" component={AddPhoto} />
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ animation: 'none' }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Subscription" component={Subscription} />
        <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
        <Stack.Screen name="LifestyleInsights" component={LifestyleInsights} />
        <Stack.Screen name="YourLifestyle" component={YourLifestyle} />
        <Stack.Screen
          name="DietaryPreferences"
          component={DietaryPreferences}
        />
        <Stack.Screen name="YourStressLevel" component={YourStressLevel} />
        <Stack.Screen name="GeneralSettings" component={GeneralSettings} />
        <Stack.Screen name="ConsultReport" component={ConsultReport} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="DiseaseDetails" component={DiseaseDetails} />
        <Stack.Screen
          name="ManageSubscription"
          component={ManageSubscription}
        />
        <Stack.Screen name="OrderDetails" component={OrderDetails} />
        <Stack.Screen name="OrderReview" component={OrderReview} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="OrderPreview" component={OrderPreview} />
        <Stack.Screen name="CancelOrder" component={CancelOrder} />
        <Stack.Screen name="Success" component={Success} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
