import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parseVideoCallFromUrl } from '../utils/deepLinking';
import auth from '@react-native-firebase/auth';
import { colors } from '../Constant/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticatedUser } from '../store/Slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../store/store';
import navigateAfterAuth from '../Helpers/navigateAfterAuth';

export default function Splash(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();
  const isNewUser = useSelector((state: RootState) => state.auth.isNewUser);

  useEffect(() => {
    const init = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl && parseVideoCallFromUrl(initialUrl)) {
          return;
        }
        const pendingUrl = await AsyncStorage.getItem('PENDING_CALL_URL');
        if (pendingUrl && parseVideoCallFromUrl(pendingUrl)) {
          return;
        }
      } catch {}

      const currentUser = auth().currentUser;
      if (!currentUser) {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        return;
      }

      dispatch(
        setAuthenticatedUser({
          uid: currentUser.uid,
          email: currentUser.email ?? null,
          emailVerified: !!currentUser.emailVerified,
          providerId: currentUser.providerId ?? null,
        }),
      );

      await navigateAfterAuth(
        dispatch,
        navigation as any,
        currentUser.uid,
        isNewUser,
      );
    };

    init();
  }, [dispatch, navigation, isNewUser]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
