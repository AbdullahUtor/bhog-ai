import React, {useState} from 'react';
import {View, Button, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import { signInWithGoogle } from '../../services/GoogleAuthService';
import AppIcons from '../../utils/Icons.ts';
import SocialAuthButton from '../../components/common/SocialAuthButton.tsx';
import BhogiLogo from '../../components/common/CenteredLogo.tsx';
import Icons from '../../utils/Icons.ts';
import palette from '../../utils/colors.ts';
import OutlineButton from '../../components/common/OutlineButton.tsx';
import {fetchUserProfile} from "../../services/UserService.ts";
import {useUser} from '../../hooks/UserContext.tsx';
import {sendFcmTokenToBackend} from '../../services/UserFcmService.ts';
const { width, height } = Dimensions.get('window');

const SignInScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try{
        const user = await signInWithGoogle();
        if (user) {
            console.log('User Info:', user);

            await sendFcmTokenToBackend();

            const { isValidUser, userData, selectedDishes = [] } = await fetchUserProfile();

          setUser(userData);

          let nextRoute = 'MainTabs';
          if (!isValidUser) {
            nextRoute = 'Username';
          } else if (!selectedDishes.length) {
            nextRoute = 'FoodQuiz';
          }

          navigation.reset({
            index: 0,
            routes: [{ name: nextRoute }],
          });

            // if (isValidUser) {
            //     // Navigate directly to MainTabs if profile is complete
            //   setUser(userData);
            //     navigation.reset({
            //         index: 0,
            //         // routes: [{ name: 'MainTabs' }],
            //         routes:[{name: 'FoodAllergen'}],
            //     });
            // } else {
            //     // Otherwise, go to Username screen to complete profile
            //     navigation.reset({
            //         index: 0,
            //         routes: [{ name: 'Username' }],
            //     });
            // }
        }

    }catch(error){
        console.error('Error during Google sign-in:', error);
    } finally {
        setLoading(false);
    }

  };

  return (

      <View style={styles.background_container}>
          <BhogiLogo logo={AppIcons.brownLogo} />
          <View style={{ height: height * 0.25 }} />


                  <SocialAuthButton
                      text='Sign in with Apple'
                      imageSrc={Icons.appleLogo}
                      onPress={() => {}}
                      backgroundColor={palette.accent.light}
                      disabled={loading}
                  />
                  <View style={{ height: height * 0.015 }} />

          {loading ? (
                  <ActivityIndicator size="large" color={palette.accent.dark} />
              ) : (
                  <>
                  <SocialAuthButton
                      text='Sign in with Google'
                      imageSrc={Icons.googleLogo}
                      onPress={handleGoogleSignIn}
                      backgroundColor={palette.accent.light}
                      disabled={loading}
                  />
                  </>
              )}
                  <View style={{ height: height * 0.015 }} />
                  <SocialAuthButton
                      text='Sign in with Facebook'
                      imageSrc={Icons.fbLogo}
                      onPress={() => {}}
                      backgroundColor={palette.accent.light}
                      disabled={loading}
                  />
                  <View style={{ height: height * 0.03 }} />
                  <OutlineButton
                      title="Learn more?"
                      onPress={() => {}}
                      borderColor="#FAFAF7"
                      backgroundColor="#FAFAF7"
                      color='#303030'
                      isUnderlined={true}
                      disabled={loading}
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
