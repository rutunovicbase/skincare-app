const functions = require('firebase-functions/v1');
const { RtcTokenBuilder, RtcRole } = require('agora-token');
require('dotenv').config();

const APP_ID = process.env.AGORA_APP_ID || '';
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE || '';

const agoraTokenGenerator = functions.https.onRequest(async (req, res) => {
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

module.exports = { agoraTokenGenerator };

// https://us-central1-skincare-5f908.cloudfunctions.net/agoraTokenGenerator
