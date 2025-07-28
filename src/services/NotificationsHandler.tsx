import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export const initializeNotifications = (onFeedbackNotification: () => void) => {
  // Request permission on iOS
  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permissions granted.');
    } else {
      console.log('Notification permissions not granted.');
    }
  };

  const handleMessage = (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    const { data } = remoteMessage;

    if (data?.type === 'feedback') {
      console.log('📬 Feedback notification received');
      onFeedbackNotification(); // trigger your bottom sheet here
    }
  };

  const setupListeners = () => {
    // Foreground
    messaging().onMessage(async message => {
      handleMessage(message);
    });

    // Background/terminated (when user taps)
    messaging().onNotificationOpenedApp(message => {
      if (message) handleMessage(message);
    });

    // Terminated
    messaging()
      .getInitialNotification()
      .then(message => {
        if (message) handleMessage(message);
      });

    // Token refresh
    messaging().onTokenRefresh(newToken => {
      console.log('🔁 FCM token refreshed:', newToken);
      // Optionally send to backend
    });
  };

  requestPermission().then(setupListeners);
};
