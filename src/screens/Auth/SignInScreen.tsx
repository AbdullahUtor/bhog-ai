// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
//
// const SignInScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>🔐 Sign In Screen</Text>
//     </View>
//   );
// };
//
// export default SignInScreen;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
// });


// src/screens/Auth/SignInScreen.tsx

import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { signInWithGoogle } from '../../services/GoogleAuthService';

const SignInScreen = ({ navigation }) => {
  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log('User Info:', user);
      navigation.navigate('Username');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Sign in with Google" onPress={handleGoogleSignIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SignInScreen;
