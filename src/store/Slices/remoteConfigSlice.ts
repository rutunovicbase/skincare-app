import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type LocalizedItem = { id?: string; key?: string; title: string };

type SupportedKeys = 'yourLifestyle' | 'dietaryPreferences' | 'yourStressLevel';

type Locale = string;

export type RemoteConfigListsState = {
  lists: Partial<
    Record<SupportedKeys, Partial<Record<Locale, LocalizedItem[]>>>
  >;
};

const initialState: RemoteConfigListsState = {
  lists: {},
};

type SetLocalizedListPayload = {
  key: SupportedKeys;
  locale: string;
  list: LocalizedItem[];
};

const remoteConfigSlice = createSlice({
  name: 'remoteConfig',
  initialState,
  reducers: {
    setLocalizedList: (
      state,
      action: PayloadAction<SetLocalizedListPayload>,
    ) => {
      const { key, locale, list } = action.payload;
      if (!state.lists[key]) state.lists[key] = {};
      state.lists[key]![locale] = list;
    },
    resetRemoteConfigState: () => initialState,
  },
});

export const { setLocalizedList, resetRemoteConfigState } =
  remoteConfigSlice.actions;

export default remoteConfigSlice.reducer;
