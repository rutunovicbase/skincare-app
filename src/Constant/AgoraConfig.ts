// Agora Configuration
export const AGORA_CONFIG = {
  APP_ID: '48fe6948e727477b8651d51485f5a618',
  CHANNEL_NAME: 'skincare-consultation',
  TOKEN_SERVER_URL:
    'https://us-central1-skincare-5f908.cloudfunctions.net/agoraTokenGenerator',
};

// Call states
export enum CallState {
  IDLE = 'idle',
  JOINING = 'joining',
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}

// User roles
export enum UserRole {
  CLIENT = 'client',
  ADMIN = 'admin',
}
