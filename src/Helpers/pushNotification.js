import messaging from '@react-native-firebase/messaging';
import CallKeepService from '../Services/CallKeepService';

let activeCallUUID = null;

export const getPushNotification = async () => {
  messaging().onMessage(async remoteMessage => {
    if (
      remoteMessage.data?.channelName &&
      remoteMessage.data?.sessionId &&
      remoteMessage.data.sessionId !== activeCallUUID
    ) {
      activeCallUUID = remoteMessage.data.sessionId;
      const callData = {
        sessionId: remoteMessage.data.sessionId,
        channelName: remoteMessage.data.channelName,
        rtcToken: remoteMessage.data.rtcToken || '',
      };
      await CallKeepService.displayIncomingCall(
        remoteMessage.data.sessionId,
        remoteMessage.notification?.title || 'Incoming Video Call',
        remoteMessage.data.channelName,
        true,
        callData,
      );
    }
  });
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (
    remoteMessage.data?.channelName &&
    remoteMessage.data?.sessionId &&
    remoteMessage.data.sessionId !== activeCallUUID
  ) {
    activeCallUUID = remoteMessage.data.sessionId;
    const callData = {
      sessionId: remoteMessage.data.sessionId,
      channelName: remoteMessage.data.channelName,
      rtcToken: remoteMessage.data.rtcToken || '',
    };
    await CallKeepService.displayIncomingCall(
      remoteMessage.data.sessionId,
      remoteMessage.notification?.title || 'Incoming Video Call',
      remoteMessage.data.channelName,
      true,
      callData,
    );
  }
});
