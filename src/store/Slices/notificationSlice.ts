import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type NotificationData = {
  android?: object;
  body: string;
  title: string;
  notificationData?: {
    channelName: string;
    rtcToken: string;
    sessionId: string;
  };
};

type NotificationState = {
  isNotification: boolean;
  data: NotificationData | null;
};

const initialNotificationState: NotificationState = {
  isNotification: false,
  data: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialNotificationState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{
        isNotification: boolean;
        data: NotificationData;
      }>,
    ) => {
      state.isNotification = action.payload.isNotification;
      state.data = action.payload.data;
    },
    clearNotification: state => {
      state.isNotification = false;
      state.data = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
