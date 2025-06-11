import React, {JSX, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';


import '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth';
import {UserProvider} from './src/hooks/UserContext.tsx'; // Add other services if used

function App(): JSX.Element {
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(
        firebase
      );
    }
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
