import baseClient from './BaseClient';
import messaging from '@react-native-firebase/messaging';

export const sendFcmTokenToBackend = async (): Promise<void> => {
  try {
    const fcmToken = await messaging().getToken();
    if (!fcmToken) {
      throw new Error('No FCM token available');
    }

    console.log('🚀 FCM TOKEN: ', fcmToken);

    const response = await baseClient.put('/user/fcm-token', {
      fcm_token: fcmToken,
    });

    console.log('✅ FCM token updated successfully:', response.data);
  } catch (err) {
    console.error('❌ Failed to send FCM token to backend:', err);
    throw err;
  }
};
