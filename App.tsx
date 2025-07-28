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


function App() {
  const [showFeedbackSheet, setShowFeedbackSheet] = useState(false);

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebase);
    }

    // Initialize notifications once on app load
    initializeNotifications(() => {
      // This callback is called when feedback notification is tapped
      setShowFeedbackSheet(true);
    });
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <RootNavigator showFeedbackSheet={showFeedbackSheet} setShowFeedbackSheet={setShowFeedbackSheet} />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
