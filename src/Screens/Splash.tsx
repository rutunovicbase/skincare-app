import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { colors } from '../Constant/Colors';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthenticatedUser } from '../store/Slices/authSlice';
import { useNavigation } from '@react-navigation/native';
import { RootState } from '../store/store';

export default function Splash(): React.JSX.Element {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const isNewUser = useSelector((state: RootState) => state.auth.isNewUser);

  useEffect(() => {
    const init = async () => {
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

      const docRef = firestore().collection('users').doc(currentUser.uid);
      const snap = await docRef.get();
      const data = snap.data() || {};

      const detailsCompleted = !!data.detailsCompleted;

      if (isNewUser && !detailsCompleted) {
        navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
        return;
      }

      if (!isNewUser && !detailsCompleted) {
        navigation.reset({ index: 1, routes: [{ name: 'OnboardingFlow' }] });
        return;
      }

      navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
    };

    init();
  }, [dispatch, navigation]);

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
