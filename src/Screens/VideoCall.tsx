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
} from 'react-native-agora';
import { colors } from '../Constant/Colors';
import { fonts } from '../Constant/Fonts';
import { fontSize, hp, wp, goBack } from '../Helpers/globalFunction';
import { AGORA_CONFIG, CallState, UserRole } from '../Constant/AgoraConfig';
import { icons } from '../Constant/Icons';

interface VideoCallProps {
  route?: {
    params?: {
      userRole?: UserRole;
      channelName?: string;
    };
  };
}

const VideoCall: React.FC<VideoCallProps> = ({ route }) => {
  const [callState, setCallState] = useState<CallState>(CallState.IDLE);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [remoteUsers, setRemoteUsers] = useState<number[]>([]);
  const [localUid, setLocalUid] = useState<number>(0);

  const engineRef = useRef<IRtcEngine | null>(null);
  const userRole = route?.params?.userRole || UserRole.CLIENT;
  const channelName = route?.params?.channelName || AGORA_CONFIG.CHANNEL_NAME;

  useEffect(() => {
    initializeAgora();
    return () => {
      cleanup();
    };
  }, []);

  const initializeAgora = async () => {
    try {
      setCallState(CallState.JOINING);

      const engine = createAgoraRtcEngine();
      engineRef.current = engine;

      engine.initialize({
        appId: AGORA_CONFIG.APP_ID,
        channelProfile: ChannelProfileType.ChannelProfileCommunication,
      });

      setupEventHandlers(engine);

      engine.enableVideo();
      engine.startPreview();
      engine.enableAudio();

      const role =
        userRole === UserRole.ADMIN
          ? ClientRoleType.ClientRoleBroadcaster
          : ClientRoleType.ClientRoleBroadcaster;
      engine.setClientRole(role);

      await generateToken();
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
      onJoinChannelSuccess: connection => {
        console.log('Joined channel successfully:', connection);
        setCallState(CallState.CONNECTED);
      },
      onUserJoined: (connection, remoteUid) => {
        console.log('User joined:', remoteUid);
        setRemoteUsers(prev => [...prev, remoteUid]);
      },
      onUserOffline: (connection, remoteUid) => {
        console.log('User offline:', remoteUid);
        setRemoteUsers(prev => prev.filter(id => id !== remoteUid));
      },
      onError: (err: number, msg: string) => {
        console.log('Agora error:', err, msg);
        setCallState(CallState.ERROR);
      },
      onLeaveChannel: () => {
        console.log('Left channel');
        setCallState(CallState.DISCONNECTED);
        setRemoteUsers([]);
      },
    };

    engine.registerEventHandler(eventHandlers);
  };

  const generateToken = async () => {
    try {
      const response = await fetch(AGORA_CONFIG.TOKEN_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          channelName,
          uid: 0,
          role: 'publisher',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate token');
      }

      const json = await response.json();
      const serverToken = json?.data?.token || json?.token;
      if (!serverToken) throw new Error('Token not found in response');

      setLocalUid(0);
      await joinChannel(serverToken);
    } catch (error) {
      console.error('Token generation failed:', error);
      Alert.alert('Error', 'Failed to generate call token. Please try again.');
      setCallState(CallState.ERROR);
    }
  };

  const joinChannel = async (token: string) => {
    if (!engineRef.current) return;

    try {
      engineRef.current.joinChannel(token, channelName, localUid, {
        clientRoleType:
          userRole === UserRole.ADMIN
            ? ClientRoleType.ClientRoleBroadcaster
            : ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (error) {
      console.error('Failed to join channel:', error);
      setCallState(CallState.ERROR);
    }
  };

  const leaveChannel = async () => {
    if (!engineRef.current) return;

    try {
      engineRef.current.leaveChannel();
      setCallState(CallState.DISCONNECTED);
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
      case CallState.JOINING:
        return (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
            <Text style={styles.loadingText}>Connecting to call...</Text>
          </View>
        );

      case CallState.CONNECTED:
        return (
          <View style={styles.callContainer}>
            <View style={styles.videoContainer}>
              <View style={styles.localVideoView}>
                <RtcSurfaceView
                  canvas={{ uid: 0 }}
                  style={styles.rctViewStyle}
                />
              </View>

              {remoteUsers.map(uid => (
                <RtcSurfaceView
                  key={uid}
                  canvas={{ uid }}
                  style={styles.remoteVideoView}
                />
              ))}
            </View>

            <View style={styles.controlsContainer}>
              <TouchableOpacity
                style={[styles.controlButton]}
                onPress={toggleMute}
              >
                {isMuted ? (
                  <Image source={icons.mute} style={styles.iconsStyle} />
                ) : (
                  <Image source={icons.unmute} style={styles.iconsStyle} />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.controlButton]}
                onPress={toggleVideo}
              >
                {isVideoEnabled ? (
                  <Image
                    source={icons.videoCameraDisabled}
                    style={styles.iconsStyle}
                  />
                ) : (
                  <Image source={icons.videoCamera} style={styles.iconsStyle} />
                )}
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
  backButtonText: {
    color: colors.background,
    fontSize: fontSize(16),
    fontFamily: fonts.Medium,
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
  },
  localVideoView: {
    position: 'absolute',
    top: hp(2),
    right: wp(4),
    width: wp(30),
    height: hp(20),
    backgroundColor: colors.textRGBA,
    borderRadius: wp(2),
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteVideoView: {
    flex: 1,
    backgroundColor: colors.textRGBA,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rctViewStyle: {
    width: '100%',
    height: '100%',
  },
  videoLabel: {
    color: colors.background,
    fontSize: fontSize(14),
    fontFamily: fonts.Medium,
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
