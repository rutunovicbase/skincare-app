import messaging from '@react-native-firebase/messaging';
import { store } from '../store/store';
import { setNotification } from '../store/Slices/notificationSlice';

export const getPushNotification = async () => {
  messaging().onMessage(async remoteMessage => {
    const data = JSON.stringify(remoteMessage.notification);
    store?.dispatch(
      setNotification({
        isNotification: true,
        data: { ...JSON.parse(data), notificationData: remoteMessage.data },
      }),
    );
  });
};
