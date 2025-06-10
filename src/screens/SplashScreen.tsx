// import React, {useEffect} from 'react';
import React, {useEffect, useState} from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import BhogiLogo from '../components/common/CenteredLogo.tsx';
import {fetchUserProfile} from "../services/UserService.ts";

export default function SplashScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthState = () => {
      const unsubscribe = auth().onAuthStateChanged(async user => {
        if (user) {
          try {
            const { isValidUser } = await fetchUserProfile();

            navigation.reset({
              index: 0,
              routes: [{ name: isValidUser ? 'MainTabs' : 'Username' }],
            });
          } catch (e) {
            // fallback to login
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          }
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
          });
        }
      });

      return unsubscribe;
    };

    const timeout = setTimeout(() => checkAuthState(), 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);


  return (
      <View style={styles.container}>
        <BhogiLogo />
        {loading && (
            <ActivityIndicator
                size="large"
                color="#ffffff"
                style={styles.loader}
            />
        )}
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
  loader: {
    marginTop: 20,
  },
});