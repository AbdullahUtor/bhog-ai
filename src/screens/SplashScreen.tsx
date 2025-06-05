import React, {useEffect} from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();



  useEffect(() => {
    const timeout = setTimeout(() => {
      const isAuthenticated = false; // Change this for your testing

      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        });
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
      <Text>This is Splash Screen Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
