import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '1054359019154-ffocuj54o7s1mlc3j46t31p76vc8vvl1.apps.googleusercontent.com',
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data?.idToken ?? '');
    const userCredential = await auth().signInWithCredential(googleCredential);

    // ✅ Get Firebase ID Token (what backend expects)
    const firebaseIdToken = await userCredential.user.getIdToken(true);
    console.log('✅ Firebase ID Token:', firebaseIdToken);

    return userCredential.user;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign-in is in progress');
    } else {
      console.error(error);
    }
  }
};

export const signOutFromGoogle = async () => {
  try {
    await GoogleSignin.signOut();
    await auth().signOut();
  } catch (error) {
    console.error('Sign out error:', error);
  }
};


