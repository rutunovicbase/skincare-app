import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/Navigation/RootNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RootState } from './src/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import i18n from './src/I18n';
import { fetchAndActivateConfig, getLocalizedList } from './src/Helpers/remoteConfig';
import { setLocalizedList } from './src/store/Slices/remoteConfigSlice';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const language = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  // Prefetch Remote Config lists whenever language changes
  useEffect(() => {
    const prefetch = async () => {
      try {
        await fetchAndActivateConfig();
        const locale = language || 'en';
        const keys: Array<'yourLifestyle' | 'dietaryPreferences' | 'yourStressLevel'> = [
          'yourLifestyle',
          'dietaryPreferences',
          'yourStressLevel',
        ];
        keys.forEach(key => {
          const list = getLocalizedList(key, locale);
          dispatch(setLocalizedList({ key, locale, list }));
        });
      } catch (_) {}
    };
    prefetch();
  }, [dispatch, language]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
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
