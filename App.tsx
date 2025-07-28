// import React, {JSX, useEffect} from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import RootNavigator from './src/navigation/RootNavigator';
//
//
// import '@react-native-firebase/auth';
// import {firebase} from '@react-native-firebase/auth';
// import {UserProvider} from './src/hooks/UserContext.tsx'; // Add other services if used
//
// function App(): JSX.Element {
//   useEffect(() => {
//     if (!firebase.apps.length) {
//       firebase.initializeApp(
//         firebase
//       );
//     }
//   }, []);
//
//   return (
//     <UserProvider>
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </UserProvider>
//   );
// }
//
// export default App;


import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';

import '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { UserProvider } from './src/hooks/UserContext.tsx';
import {initializeNotifications} from './src/services/NotificationsHandler.tsx';
import messaging from '@react-native-firebase/messaging';
import FeedbackDialog from './src/components/common/FeedbackDialog.tsx';


function App() {
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  useEffect(() => {
    // Ask for notification permission
    const requestPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Notification permission granted');
      }
    };

    // Listen for when a notification is tapped (background or terminated)
    const setupNotificationListeners = () => {
      messaging().onNotificationOpenedApp(remoteMessage => {
        // if (remoteMessage?.data?.type === 'feedback') {
          setShowFeedbackDialog(true);
        // }
      });

      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage?.data?.type === 'feedback') {
            setShowFeedbackDialog(true);
          }
        });
    };

    requestPermission();
    setupNotificationListeners();
  }, []);
  return (
    <UserProvider>
      <NavigationContainer>
        <RootNavigator />

        <FeedbackDialog
          visible={showFeedbackDialog}
          onClose={() => setShowFeedbackDialog(false)}
        />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
