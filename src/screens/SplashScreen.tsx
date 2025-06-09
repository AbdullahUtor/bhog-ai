// import React, {useEffect} from 'react';
import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import BhogiLogo from '../components/common/CenteredLogo.tsx';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
      setTimeout(() => {
      const unsubscribe = auth().onAuthStateChanged(async (user) => {
        if (user) {
          try {
            const idToken = await user.getIdToken(true); // true forces refresh
            console.log('✅ Firebase ID Token:', idToken);

            navigation.reset({
              index: 0,
              routes: [{ name: 'MainTabs' }],
            });
          } catch (error) {
            console.error('Failed to get ID token:', error);
          }
        } else {
          // No user is signed in
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }], // or your AuthNavigator initial route
          });
        }
      });
        return unsubscribe;
    }, 2000);

    // clean up on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <BhogiLogo />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#525147',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});