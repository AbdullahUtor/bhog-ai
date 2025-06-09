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
import {View, Button, StyleSheet, Dimensions} from 'react-native';
import { signInWithGoogle } from '../../services/GoogleAuthService';
import AppIcons from '../../utils/Icons.ts';
import SocialAuthButton from '../../components/common/SocialAuthButton.tsx';
import BhogiLogo from '../../components/common/CenteredLogo.tsx';
import Icons from '../../utils/Icons.ts';
import palette from '../../utils/colors.ts';
import OutlineButton from '../../components/common/OutlineButton.tsx';
const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {

  const handleGoogleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log('User Info:', user);
      navigation.navigate('Username');
    }
  };

  return (

      <View style={styles.background_container}>
        <BhogiLogo logo={AppIcons.brownLogo} />
        <View style={{ height: height * 0.25 }} />

        <SocialAuthButton
          text='Sign in with Apple'
          imageSrc={Icons.appleLogo}
          onPress={()=>{}}
          backgroundColor={palette.accent.light}
        />
        <View style={{ height: height * 0.015 }} />
        <SocialAuthButton
          text='Sign in with Google'
          imageSrc={Icons.googleLogo}
          onPress={handleGoogleSignIn}
          backgroundColor={palette.accent.light}
        />
        <View style={{ height: height * 0.015 }} />
        <SocialAuthButton
          text='Sign in with Facebook'
          imageSrc={Icons.fbLogo}
          onPress={()=>{}}
          backgroundColor={palette.accent.light}
        />
        <View style={{ height: height * 0.03 }} />
        <OutlineButton
          title="Learn more?"
          onPress={()=>{}}
          borderColor="#FFFFFF"
          backgroundColor="#FFFFFF"
          color='#303030'
          isUnderlined={true}
        />
      </View>

  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background_container: {
    backgroundColor: '#FAFAF7',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: width * 0.06,
  },
});


export default SignInScreen;
