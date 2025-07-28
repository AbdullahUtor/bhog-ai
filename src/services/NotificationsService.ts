import messaging from '@react-native-firebase/messaging';

export async function requestUserPermission(): Promise<boolean> {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  return enabled;
}

export async function getFcmToken(): Promise<string | null> {
  try {
    const token = await messaging().getToken();
    console.log('[FCM] Token:', token);
    return token;
  } catch (error) {
    console.error('[FCM] Failed to get token', error);
    return null;
  }
}
