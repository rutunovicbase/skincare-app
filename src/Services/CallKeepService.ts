import { Platform, Linking } from 'react-native';
import { buildVideoCallUrl } from '../utils/deepLinking';
import RNCallKeep from 'react-native-callkeep';
import { CallState, UserRole } from '../Constant/AgoraConfig';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { store } from '../store/store';
import moment from 'moment';

const callKeepOptions = {
  ios: {
    appName: 'Skincare App',
    supportsVideo: true,
    maximumCallGroups: '1',
    maximumCallsPerCallGroup: '1',
  },
  android: {
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'OK',
    imageName: 'ic_launcher',
    additionalPermissions: [],
    selfManaged: false,
    foregroundService: {
      channelId: 'com.skincarenb.app.video_call',
      channelName: 'Video Call',
      notificationTitle: 'Ongoing video call',
      notificationIcon: 'ic_launcher',
    },
  },
};

interface CallData {
  sessionId: string;
  channelName: string;
  rtcToken: string;
}

class CallKeepService {
  private static instance: CallKeepService;
  private pendingCalls: Map<string, CallData> = new Map();
  private displayedCalls: Set<string> = new Set();
  private answeredCalls: Set<string> = new Set();
  private isInitialized = false;

  private constructor() {
    this.initializeCallKeep();
    this.setupEventListeners();
  }

  public static getInstance(): CallKeepService {
    if (!CallKeepService.instance) {
      CallKeepService.instance = new CallKeepService();
    }
    return CallKeepService.instance;
  }

  private async initializeCallKeep() {
    if (this.isInitialized) return;
    try {
      await RNCallKeep.setup(callKeepOptions);
      if (Platform.OS === 'android') RNCallKeep.setAvailable(true);
      this.isInitialized = true;
    } catch {}
  }

  private setupEventListeners() {
    RNCallKeep.addEventListener('didDisplayIncomingCall', () => {});

    RNCallKeep.addEventListener('answerCall', async ({ callUUID }) => {
      try {
        let callData = this.pendingCalls.get(callUUID);

        if (!callData) {
          const sessionDoc = await firestore()
            .collection('videoCallSessions')
            .doc(callUUID)
            .get();

          if (sessionDoc.exists()) {
            const data = sessionDoc.data();
            callData = {
              sessionId: callUUID,
              channelName: data?.channelName || '',
              rtcToken: data?.patientToken || '',
            };
          }
        }

        if (callData) {
          RNCallKeep.setCurrentCallActive(callUUID);

          if (Platform.OS === 'android') RNCallKeep.backToForeground();

          const url = buildVideoCallUrl({
            userRole: UserRole.CLIENT,
            channelName: callData.channelName,
            rtcToken: callData.rtcToken,
            sessionId: callData.sessionId,
          });

          await AsyncStorage.setItem('PENDING_CALL_URL', url);
          await new Promise(r => setTimeout(r, 200));
          await Linking.openURL(url);

          this.pendingCalls.delete(callUUID);
          this.answeredCalls.add(callUUID);

          setTimeout(() => {
            RNCallKeep.endCall(callUUID);
            setTimeout(() => this.answeredCalls.delete(callUUID), 2000);
          }, 2000);
        }
      } catch (err) {
        console.error('Error answering call:', err);
      }
    });

    RNCallKeep.addEventListener('endCall', async ({ callUUID }) => {
      if (!this.answeredCalls.has(callUUID)) {
        await this.logCallRejection(callUUID);
        try {
          await AsyncStorage.removeItem('PENDING_CALL_URL');
        } catch {}
      }
      this.pendingCalls.delete(callUUID);
      this.displayedCalls.delete(callUUID);
    });
  }

  private async logCallRejection(callUUID: string) {
    try {
      await firestore()
        .collection('videoCallSessions')
        .doc(callUUID)
        .update({
          status: CallState.DISCONNECTED,
          rejectedBy: store?.getState()?.auth?.user?.uid || null,
          rejectedAt: moment().toISOString(),
        });
      RNCallKeep.endCall(callUUID);
    } catch {}
  }

  public async displayIncomingCall(
    uuid: string,
    callerName: string,
    handle: string,
    hasVideo: boolean = true,
    callData?: CallData,
  ) {
    try {
      if (!this.isInitialized) await this.initializeCallKeep();
      if (this.displayedCalls.has(uuid) || this.answeredCalls.has(uuid)) return;
      if (callData) this.pendingCalls.set(uuid, callData);
      if (Platform.OS === 'android') {
        const hasAccount = await RNCallKeep.hasPhoneAccount();
        if (!hasAccount) return;
      }
      RNCallKeep.displayIncomingCall(
        uuid,
        handle,
        callerName,
        'generic',
        hasVideo,
      );
      this.displayedCalls.add(uuid);
    } catch {}
  }

  public endCall(uuid: string) {
    RNCallKeep.endCall(uuid);
  }

  public async requestPermissions() {
    if (Platform.OS === 'android') {
      try {
        const hasAccount = await RNCallKeep.hasPhoneAccount();
        if (!hasAccount) {
          await RNCallKeep.setup(callKeepOptions);
          RNCallKeep.setAvailable(true);
        }
        return true;
      } catch {
        return false;
      }
    }
    return true;
  }

  public async checkAndRequestPermissions() {
    if (Platform.OS === 'android') {
      try {
        const hasAccount = await RNCallKeep.hasPhoneAccount();
        return hasAccount;
      } catch {
        return false;
      }
    }
    return true;
  }
}

export default CallKeepService.getInstance();
