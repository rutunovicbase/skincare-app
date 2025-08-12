import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../I18n';

const initialState = {
  language: 'en',
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
    resetLanguageState: () => {
      return initialState;
    },
  },
});

export const { setLanguage, resetLanguageState } = languageSlice.actions;

export default languageSlice.reducer;
