import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import auth, { GoogleAuthProvider } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export type AuthUser = {
  uid: string | null;
  email: string | null;
  emailVerified: boolean;
  providerId: string | null;
};

type AuthState = {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isAppLock: boolean;
  isNewUser?: boolean;
};

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isAppLock: false,
  isNewUser: undefined,
};

export const signInWithGoogleIdToken = createAsyncThunk(
  'auth/signInWithGoogleIdToken',
  async (idToken: string, { rejectWithValue }) => {
    try {
      const googleCredential = GoogleAuthProvider.credential(idToken);

      const result = await auth().signInWithCredential(googleCredential);
      const firebaseUser = result.user;

      const userDocRef = firestore().collection('users').doc(firebaseUser.uid);

      await userDocRef.set(
        {
          uid: firebaseUser.uid,
          email: firebaseUser.email ?? null,
          providerId: 'google.com',
        },
        { merge: true },
      );

      const userSnap = await userDocRef.get();
      if (!userSnap.exists || !userSnap.data()?.createdAt) {
        await userDocRef.set(
          { createdAt: firestore.FieldValue.serverTimestamp() },
          { merge: true },
        );
      }

      const mapped: AuthUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email ?? null,
        emailVerified: !!firebaseUser.emailVerified,
        providerId: 'google.com',
      };

      return {
        user: mapped,
        isNewUser: !!result?.additionalUserInfo?.isNewUser,
      };
    } catch (err: any) {
      return rejectWithValue({
        code: err?.code ?? 'auth/unknown',
        message: err?.message ?? 'Google sign-in failed',
      });
    }
  },
);

export const signOut = createAsyncThunk('auth/signOut', async () => {
  try {
    // No-op for Google sign-out when not using Google SDK directly
  } finally {
    await auth().signOut();
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    setAuthenticatedUser: (state, action: PayloadAction<AuthUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.error = null;
      state.isLoading = false;
    },
    setIsNewUser: (state, action: PayloadAction<boolean | undefined>) => {
      state.isNewUser = action.payload;
    },
    setAppLock: (state, action: PayloadAction<boolean>) => {
      state.isAppLock = action.payload;
    },
    toggleAppLock: state => {
      state.isAppLock = !state.isAppLock;
    },
    resetAuthState: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(signInWithGoogleIdToken.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        signInWithGoogleIdToken.fulfilled,
        (
          state,
          action: PayloadAction<{ user: AuthUser; isNewUser: boolean }>,
        ) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.isNewUser = action.payload.isNewUser;
        },
      )
      .addCase(signInWithGoogleIdToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Sign-in failed';
      })
      .addCase(signOut.fulfilled, state => {
        state.user = null;
        state.isLoading = false;
        state.error = null;
        state.isAuthenticated = false;
      });
  },
});

export const {
  resetAuthState,
  setAuthenticatedUser,
  clearError,
  setIsNewUser,
  setAppLock,
  toggleAppLock,
} = authSlice.actions;
export default authSlice.reducer;
