import React from 'react';
import {View, Text, StyleSheet, Alert, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signOutFromGoogle} from '../../services/GoogleAuthService.ts';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async ()=>{
    try{
      await signOutFromGoogle();
      navigation.reset(
        {
          index: 0,
          routes: [{name: 'SignIn'}],
        }
      );
    }catch(error){
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>👤 Profile Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
