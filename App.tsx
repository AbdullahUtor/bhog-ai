import React, {JSX, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';


import '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/auth'; // Add other services if used

function App(): JSX.Element {
  useEffect(() => {
    // Initialize Firebase if not already initialized
    if (!firebase.apps.length) {
      firebase.initializeApp(
        firebase
      ); // No config needed if native setup is done
    }
  }, []);

  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
