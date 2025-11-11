import { Linking } from 'react-native';
import { LinkingOptions } from '@react-navigation/native';

export const linking: LinkingOptions<Record<string, object | undefined>> = {
  prefixes: ['skincare://app'],
  config: {
    screens: {
      Splash: 'splash',
      Login: 'login',
      OTPVerification: 'otp',
      SelectLanguage: 'select-language',
      Onboarding: 'onboarding',
      OnboardingFlow: 'onboarding-flow',
      AddPhoto: 'add-photo',
      MainTabs: {
        path: 'tabs',
        screens: {
          Home: 'home',
          Reports: 'reports',
          Scan: 'scan',
          Orders: 'orders',
          Profile: 'profile',
        },
      },
      Home: 'home',
      Subscription: 'subscription',
      ProfileDetails: 'profile-details',
      LifestyleInsights: 'lifestyle-insights',
      YourLifestyle: 'your-lifestyle',
      DietaryPreferences: 'dietary-preferences',
      YourStressLevel: 'your-stress-level',
      GeneralSettings: 'settings',
      ConsultReport: 'consult-report',
      Details: 'details',
      DiseaseDetails: 'disease-details',
      ManageSubscription: 'manage-subscription',
      OrderDetails: 'order-details',
      OrderReview: 'order-review',
      Address: 'address',
      AddAddress: 'add-address',
      OrderPreview: 'order-preview',
      CancelOrder: 'cancel-order',
      Success: 'success',
      LiveReview: 'live-review',
      VideoCall: 'video-call',
    },
  },
};

export const handleDeepLink = (url: string | null) => {
  if (!url) return;
  console.log('Deep link received:', url);
};

export const parseVideoCallFromUrl = (
  url: string,
): {
  screen: 'VideoCall';
  params: {
    userRole?: string;
    channelName?: string;
    rtcToken?: string;
    sessionId?: string;
  };
} | null => {
  try {
    const lower = url.toLowerCase();
    if (!lower.includes('video-call')) return null;
    const queryIndex = url.indexOf('?');
    const query = queryIndex >= 0 ? url.slice(queryIndex + 1) : '';
    const params = Object.fromEntries(
      query
        .split('&')
        .filter(Boolean)
        .map(kv => kv.split('='))
        .map(([k, v]) => [decodeURIComponent(k), decodeURIComponent(v || '')]),
    ) as any;
    return { screen: 'VideoCall', params };
  } catch {
    return null;
  }
};

export const buildVideoCallUrl = (args: {
  userRole?: string | number;
  channelName?: string;
  rtcToken?: string;
  sessionId?: string;
}) => {
  const toPairs = Object.entries(args)
    .filter(([_, v]) => v !== undefined && v !== null && String(v).length > 0)
    .map(
      ([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`,
    );
  const query = toPairs.join('&');
  const base = 'skincare://app/video-call';
  return query ? `${base}?${query}` : base;
};

export const initializeDeepLinking = () => {
  const handleInitialURL = async () => {
    const url = await Linking.getInitialURL();
    handleDeepLink(url);
  };

  const handleURL = (event: { url: string }) => {
    handleDeepLink(event.url);
  };

  Linking.addEventListener('url', handleURL);

  handleInitialURL();

  return () => {
    Linking.removeAllListeners('url');
  };
};
