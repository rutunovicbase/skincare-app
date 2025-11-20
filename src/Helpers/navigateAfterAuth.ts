import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { fetchUserData } from '../store/Slices/authSlice';

type Navigation = {
  reset: (state: { index: number; routes: Array<{ name: string }> }) => void;
};

export async function navigateAfterAuth(
  dispatch: ThunkDispatch<any, any, AnyAction>,
  navigation: Navigation,
  userId: string,
  isNewUser: boolean | undefined,
): Promise<void> {
  const result: any = await dispatch(fetchUserData(userId));
  const userData = result?.payload as any;
  const detailsCompleted = userData?.detailsCompleted || false;

  if (isNewUser === true) {
    navigation.reset({ index: 0, routes: [{ name: 'Onboarding' }] });
    return;
  }

  if (!detailsCompleted) {
    navigation.reset({ index: 1, routes: [{ name: 'OnboardingFlow' }] });
    return;
  }

  navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
}

export default navigateAfterAuth;
