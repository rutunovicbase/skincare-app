import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/Navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootState, store } from './src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import i18n from './src/I18n';
import {
  fetchAndActivateConfig,
  getLocalizedList,
} from './src/Helpers/remoteConfig';
import { setLocalizedList } from './src/store/Slices/remoteConfigSlice';
import { fontSize, hp, navigate, wp } from './src/Helpers/globalFunction';
import { colors } from './src/Constant/Colors';
import { fonts } from './src/Constant/Fonts';
import { UserRole } from './src/Constant/AgoraConfig';
import { clearNotification } from './src/store/Slices/notificationSlice';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const language = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();
  const notification = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    const prefetch = async () => {
      try {
        await fetchAndActivateConfig();
        const locale = language || 'en';
        const keys: Array<
          'yourLifestyle' | 'dietaryPreferences' | 'yourStressLevel'
        > = ['yourLifestyle', 'dietaryPreferences', 'yourStressLevel'];
        keys.forEach(key => {
          const list = getLocalizedList(key, locale);
          dispatch(setLocalizedList({ key, locale, list }));
        });
      } catch (_) {}
    };
    prefetch();
  }, [dispatch, language]);

  const onPressJoin = () => {
    navigate('VideoCall', {
      userRole: UserRole.CLIENT,
      channelName: notification?.data?.notificationData?.channelName || '',
      rtcToken: notification?.data?.notificationData?.rtcToken || '',
      sessionId: notification?.data?.notificationData?.sessionId || '',
    });
    store?.dispatch(clearNotification());
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
        {notification.isNotification && (
          <View style={styles.notificationBox}>
            {/* Title */}
            <Text style={styles.notificationTitle}>
              {notification.data?.title || 'You have a new notification!'}
            </Text>

            {/* Body */}
            <Text style={styles.notificationBody}>
              {notification.data?.body || 'Here is the notification details...'}
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Text
                style={[styles.button, styles.joinButton]}
                onPress={onPressJoin}
              >
                Join
              </Text>

              <Text
                style={[styles.button, styles.rejectButton]}
                onPress={() => {
                  console.log('❌ Reject pressed');
                  // TODO: handle Reject action
                }}
              >
                Reject
              </Text>
            </View>
          </View>
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  notificationBox: {
    position: 'absolute',
    top: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 40,
    alignSelf: 'center',
    backgroundColor: colors.background,
    padding: wp(4),
    borderRadius: 8,
    zIndex: 999,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    width: '95%',
  },

  notificationTitle: {
    color: colors.text,
    fontSize: fontSize(16),
    marginBottom: hp(0.61),
    fontFamily: fonts.Semibold,
  },

  notificationBody: {
    color: colors.text,
    fontSize: fontSize(14),
    marginBottom: hp(1.23),
    fontFamily: fonts.Medium,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: hp(0.98),
    borderRadius: wp(1.53),
    color: colors.background,
  },

  joinButton: {
    backgroundColor: '#4CAF50',
    marginRight: wp(1.33),
    fontFamily: fonts.Semibold,
  },

  rejectButton: {
    backgroundColor: colors.cancelRed,
    marginLeft: wp(1.33),
    fontFamily: fonts.Semibold,
  },
});

export default App;
