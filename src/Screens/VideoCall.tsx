import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  createAgoraRtcEngine,
  ChannelProfileType,
  ClientRoleType,
  IRtcEngineEventHandler,
  IRtcEngine,
  RtcSurfaceView,
  VideoSourceType,
} from 'react-native-agora';
import { colors } from '../Constant/Colors';
import { fonts } from '../Constant/Fonts';
import { fontSize, hp, wp, goBack } from '../Helpers/globalFunction';
import { AGORA_CONFIG, CallState, UserRole } from '../Constant/AgoraConfig';
import firestore from '@react-native-firebase/firestore';
import { icons } from '../Constant/Icons';

interface VideoCallProps {
  route?: {
    params?: {
      userRole?: UserRole;
      channelName?: string;
      rtcToken?: string;
      sessionId?: string;
    };
  };
}

const VideoCall: React.FC<VideoCallProps> = ({ route }) => {
  const [callState, setCallState] = useState<CallState | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [localUid, setLocalUid] = useState<number>(0);

  const engineRef = useRef<IRtcEngine | null>(null);
  const userRole = route?.params?.userRole || UserRole.CLIENT;
  const { channelName, rtcToken, sessionId } = route?.params || {};

  const sessionDocRef = sessionId
    ? firestore().collection('videoCallSessions').doc(sessionId)
    : null;

  useEffect(() => {
    initializeAgora();
    return () => {
      cleanup();
    };
  }, []);

  const initializeAgora = async () => {
    try {
      setCallState(CallState.CONNECTING);
      if (sessionDocRef) {
        await sessionDocRef.update({ status: 'CONNECTING' }).catch(() => {});
      }

      const engine = createAgoraRtcEngine();
      engineRef.current = engine;

      engine.initialize({
        appId: AGORA_CONFIG.APP_ID,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });

      setupEventHandlers(engine);

      engine.enableLocalAudio(true);
      engine.enableLocalVideo(true);
      engine.enableVideo();
      engine.enableAudio();
      engine.startPreview(VideoSourceType.VideoSourceCameraPrimary);

      const role =
        userRole === UserRole.ADMIN
          ? ClientRoleType.ClientRoleBroadcaster
          : ClientRoleType.ClientRoleBroadcaster;
      engine.setClientRole(role);

      // Join the channel only after the engine is fully initialized
      await joinChannel(rtcToken ?? '');
    } catch (error) {
      console.error('Failed to initialize Agora:', error);
      setCallState(CallState.ERROR);
      Alert.alert(
        'Error',
        'Failed to initialize video call. Please try again.',
      );
    }
  };

  const setupEventHandlers = (engine: IRtcEngine) => {
    const eventHandlers: IRtcEngineEventHandler = {
      onJoinChannelSuccess: async connection => {
        setCallState(CallState.CONNECTED);
        setLocalUid(connection?.localUid ?? 0);
      },
      onUserJoined: (connection, remoteUid) => {
        setRemoteUsers(prev => [...prev, remoteUid]);
      },
      onUserOffline: (connection, remoteUid) => {
        setRemoteUsers(prev => prev.filter(id => id !== remoteUid));
        leaveChannel();
        goBack();
      },
      onError: () => {
        setCallState(CallState.DISCONNECTED);
        if (sessionDocRef)
          sessionDocRef.update({ status: 'DISCONNECTED' }).catch(() => {});
      },
      onLeaveChannel: async () => {
        setCallState(CallState.DISCONNECTED);
        setRemoteUsers([]);
        if (sessionDocRef) {
          await sessionDocRef
            .update({ status: 'DISCONNECTED' })
            .catch(() => {});
        }
      },
    };

    engine.registerEventHandler(eventHandlers);
  };

  const joinChannel = async (token: string) => {
    if (!engineRef.current) return;

    try {
      engineRef.current.joinChannel(token, channelName ?? '', 0, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (error) {
      console.error('Failed to join channel:', error);
      setCallState(CallState.DISCONNECTED);
    }
  };

  const leaveChannel = async () => {
    if (!engineRef.current) return;

    try {
      engineRef.current.leaveChannel();
      setCallState(CallState.DISCONNECTED);
      if (sessionDocRef) {
        await sessionDocRef
          .update({ status: CallState.DISCONNECTED })
          .catch(() => {});
      }
    } catch (error) {
      console.error('Failed to leave channel:', error);
    }
  };

  const toggleMute = async () => {
    if (!engineRef.current) return;
    try {
      engineRef.current.muteLocalAudioStream(!isMuted);
      setIsMuted(!isMuted);
    } catch (error) {
      console.error('Failed to toggle mute:', error);
    }
  };

  const toggleVideo = async () => {
    if (!engineRef.current) return;
    try {
      engineRef.current.muteLocalVideoStream(!isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    } catch (error) {
      console.error('Failed to toggle video:', error);
    }
  };

  const cleanup = async () => {
    if (engineRef.current) {
      try {
        engineRef.current.leaveChannel();
        engineRef.current.release();
        engineRef.current = null;
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    }
  };

  const handleEndCall = () => {
    leaveChannel();
    goBack();
  };

  const renderCallContent = () => {
    switch (callState) {
      case CallState.CONNECTING:
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Connecting to call...</Text>
          </View>
        );

      case CallState.CONNECTED:
        const remoteUid = remoteUsers.find(uid => uid !== localUid);
        return (
          <View style={styles.callContainer}>
            <View style={styles.videoContainer}>
              {remoteUid ? (
                <View style={styles.remoteVideoWrapper}>
                  <RtcSurfaceView
                    key={remoteUid}
                    canvas={{ uid: remoteUid }}
                    style={styles.fullScreenVideoView}
                  />
                </View>
              ) : (
                <View style={styles.fullScreenPlaceholder}>
                  <Text style={{ color: colors.text }}>
                    Waiting for remote user...
                  </Text>
                </View>
              )}

              {localUid !== 0 && (
                <View style={styles.localFloatingVideoWrapper}>
                  <RtcSurfaceView
                    canvas={{ uid: 0 }}
                    style={styles.localFloatingVideo}
                    zOrderOnTop
                  />
                </View>
              )}
            </View>

            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={[styles.controlButton]}
                onPress={toggleMute}
              >
                <Image
                  source={isMuted ? icons.mute : icons.unmute}
                  style={styles.iconsStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton]}
                onPress={toggleVideo}
              >
                <Image
                  source={
                    isVideoEnabled
                      ? icons.videoCameraDisabled
                      : icons.videoCamera
                  }
                  style={styles.iconsStyle}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton, styles.endCallButton]}
                onPress={handleEndCall}
              >
                <Image source={icons.call} style={styles.iconsStyle} />
              </TouchableOpacity>
            </View>
          </View>
        );

      case CallState.ERROR:
        return (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Call failed to connect</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={initializeAgora}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.black} />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack}>
          <Image source={icons.back} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.headerSpacer} />
      </View>

      {renderCallContent()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4.26),
    paddingVertical: hp(1),
    backgroundColor: 'transparent',
    position: 'absolute',
    top: StatusBar.currentHeight,
    zIndex: 10,
  },
  backIcon: {
    height: wp(8),
    width: wp(8),
    tintColor: colors.text,
  },
  headerSpacer: {
    width: wp(12),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.background,
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
    marginTop: hp(2),
  },
  callContainer: {
    flex: 1,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: colors.black,
    position: 'relative',
  },
  fullScreenVideoView: {
    flex: 1,
    backgroundColor: colors.black,
  },
  remoteVideoWrapper: {
    flex: 1,
    position: 'relative',
  },
  fullScreenPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.black,
  },
  localFloatingVideoWrapper: {
    position: 'absolute',
    top: hp(2),
    right: wp(4),
    width: wp(30),
    height: hp(20),
    borderRadius: wp(2),
    overflow: 'hidden',
    backgroundColor: colors.textRGBA,
    zIndex: 99,
    borderWidth: 2,
    borderColor: colors.background,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  localFloatingVideo: {
    width: '100%',
    zIndex: 999,
    height: '100%',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: hp(3),
    paddingHorizontal: wp(8),
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    bottom: 0,
    zIndex: 100, // Ensure controls are above the floating video
  },
  controlButton: {
    width: wp(13.33),
    height: wp(13.33),
    borderRadius: wp(13.33),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconsStyle: {
    height: wp(6.4),
    width: wp(6.4),
    tintColor: colors.background, // Ensure icons are visible
  },
  endCallButton: {
    backgroundColor: colors.cancelRed,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(8),
  },
  errorText: {
    color: colors.background,
    fontSize: fontSize(18),
    fontFamily: fonts.Medium,
    textAlign: 'center',
    marginBottom: hp(3),
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: wp(8),
    paddingVertical: hp(1.5),
    borderRadius: wp(2),
  },
  retryButtonText: {
    color: colors.background,
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
  },
});

export default VideoCall;
