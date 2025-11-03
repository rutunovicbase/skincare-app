import { StatusBar, StyleSheet, useColorScheme, Linking } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/Navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootState } from './src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import i18n from './src/I18n';
import {
  initializeDeepLinking,
  linking,
  parseVideoCallFromUrl,
} from './src/utils/deepLinking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  fetchAndActivateConfig,
  getLocalizedList,
} from './src/Helpers/remoteConfig';
import { setLocalizedList } from './src/store/Slices/remoteConfigSlice';
import CallKeepService from './src/Services/CallKeepService';
import { navigationRef } from './src/Helpers/globalFunction';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const language = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  useEffect(() => {
    const initCallKeep = async () => {
      try {
        await CallKeepService.checkAndRequestPermissions();
      } catch (error) {
        console.error('Failed to initialize CallKeep:', error);
      }
    };
    initCallKeep();
  }, []);

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

  useEffect(() => {
    const unsubscribe = initializeDeepLinking();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer
          linking={linking}
          ref={navigationRef}
          onReady={async () => {
            try {
              const initialUrl = await Linking.getInitialURL();
              if (initialUrl) {
                const parsed = parseVideoCallFromUrl(initialUrl);
                if (parsed?.screen === 'VideoCall') {
                  navigationRef.current?.navigate(
                    'VideoCall',
                    parsed.params as any,
                  );
                  return;
                }
              }
              const pendingUrl = await AsyncStorage.getItem('PENDING_CALL_URL');
              if (pendingUrl) {
                await AsyncStorage.removeItem('PENDING_CALL_URL');
                const parsedPending = parseVideoCallFromUrl(pendingUrl);
                if (parsedPending?.screen === 'VideoCall') {
                  navigationRef.current?.navigate(
                    'VideoCall',
                    parsedPending.params as any,
                  );
                }
              }
            } catch {}
          }}
        >
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
