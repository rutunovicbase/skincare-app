const functions = require('firebase-functions/v1');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
const { RtcTokenBuilder, RtcRole } = require('agora-token');
const moment = require('moment');
require('dotenv').config();
const cors = require('cors')({ origin: true });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const APP_ID = process.env.AGORA_APP_ID || '';
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || '';

const agoraTokenGenerator = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      let { channelName, expiry } = req.body;
      if (!channelName || !APP_ID || !APP_CERTIFICATE) {
        return res
          .status(400)
          .json({ success: false, message: 'Missing fields' });
      }
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
      const { title, body, type, fcmToken, data, notification } = req.body;

      if (!fcmToken) {
        return res.status(400).json({
          success: false,
          message: 'Missing FCM token',
        });
      }

      const message = {
        token: fcmToken,
        notification: notification || {
          title: title || 'Notification',
          body: body || '',
        },
        data: {
          ...(data?.sessionId && { sessionId: String(data.sessionId) }),
          ...(data?.channelName && { channelName: String(data.channelName) }),
          ...(data?.rtcToken && { rtcToken: String(data.rtcToken) }),
          ...(type && { type: String(type) }),
        },
        android: {
          priority: 'high',
          notification: {
            channelId: 'video_call_channel',
            priority: 'high',
            sound: 'default',
          },
        },
        apns: {
          payload: {
            aps: {
              sound: 'default',
              contentAvailable: true,
            },
          },
        },
      };

      const response = await admin.messaging().send(message);

      return res.status(200).json({
        success: true,
        message: 'Push sent successfully',
        messageId: response,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Something went wrong',
        error: error.message,
      });
    }
  });
});

const razorPayWebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const payment = req?.body?.payload?.payment?.entity;
      const status = payment?.status;
      const notes = payment?.notes || {};
      const sessionId = notes?.sessionId;

      if (!sessionId) {
        return res.status(400).send('Missing sessionId');
      }

      await admin
        .firestore()
        .collection('payments')
        .add({
          paymentId: payment?.id,
          amount: payment?.amount / 100,
          currency: payment?.currency || 'INR',
          status: status,
          sessionId: sessionId,
          userId: notes?.userId,
          patientId: notes?.patientId,
          patientName: notes?.patientName,
          consultationStatus: notes?.status,
          createdAt: moment().toISOString(),
        });

      const snapshot = await admin
        .firestore()
        .collection('aiConsultation')
        .get();
      let updated = false;

      for (const doc of snapshot.docs) {
        const data = doc.data();
        const reviews = data?.review || [];

        const index = reviews.findIndex(r => r.id === sessionId);

        if (index !== -1) {
          const newStatus =
            status === 'captured'
              ? `${notes?.status} Payment Received`
              : `${notes?.status} Payment Failed`;

          const updatedReviews = [...reviews];
          updatedReviews[index].status = newStatus;

          await admin
            .firestore()
            .collection('aiConsultation')
            .doc(doc.id)
            .update({ review: updatedReviews });

          updated = true;
          break;
        }
      }

      if (!updated) {
        functions.logger.warn(
          `⚠️ No aiConsultation found for sessionId ${sessionId}`,
        );
      }

      return res.status(200).send('Webhook processed successfully');
    } catch (error) {
      console.error('❌ Webhook Error:', error);
      return res.status(500).send('Server error');
    }
  });
});

module.exports = {
  agoraTokenGenerator,
  sendPushNotification,
  razorPayWebhook,
};
