const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const { RtcTokenBuilder, RtcRole } = require('agora-token');
require('dotenv').config();
const cors = require('cors')({ origin: true });

const APP_ID = process.env.AGORA_APP_ID || '';
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || '';

const agoraTokenGenerator = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      let { channelName, expiry } = req.body;
      if (!channelName || !APP_ID || !APP_CERTIFICATE) return '';
      if (!expiry) expiry = 60;
      const currentTime = Math.floor(Date.now() / 1000);
      const privilegeExpireTime = currentTime + expiry;
      const tokenExpireTime = 600;

      const token = RtcTokenBuilder.buildTokenWithUid(
        APP_ID,
        APP_CERTIFICATE,
        channelName,
        0,
        RtcRole.PUBLISHER,
        tokenExpireTime,
        privilegeExpireTime,
      );
      return res.status(200).json({
        success: true,
        message: 'Token generated successfully',
        data: { token },
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
  });
});

const sendPushNotification = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const { title, body, type, fcmToken, data } = req.body;
      if (!title || !body || !type || !fcmToken) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }
      const message = {
        token: fcmToken,
        notification: { title, body },
        data: data ? data : {},
      };

      await admin.messaging().send(message);
      return res.status(200).json({
        success: true,
        message: 'Push sent successfully',
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
      });
    }
  });
});

module.exports = { agoraTokenGenerator, sendPushNotification };

// https://us-central1-skincare-5f908.cloudfunctions.net/agoraTokenGenerator
