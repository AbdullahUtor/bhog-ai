import React from 'react';
import {View, Text, StyleSheet, Alert, Button, Image, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {signOutFromGoogle} from '../../services/GoogleAuthService.ts';
import palette from '../../utils/colors.ts';
import AppBarWithLeading from '../../components/common/AppBar.tsx';
import AppIcons from '../../utils/Icons.ts';
import OutlineButton from "../../components/common/OutlineButton.tsx";
import {useUser} from "../../hooks/UserContext.tsx";
import getInitials from "../../utils/initials.ts";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();
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
      <AppBarWithLeading />

    <View style={{
      paddingLeft:23,
      paddingRight: 28,

    }}>
      <Text style={styles.text}>Profile</Text>
      <View style={styles.profileContainer}>
      <View style={styles.profileInitialsCircle}>
        <Text style={{
          fontSize: 32,
          fontWeight: '400',
          fontFamily: 'EB Garamond',
          color: '#AFAFA0',
        }}>
          {getInitials(user?.name)}
        </Text>
        <View style={{height: 12}}/>
      </View>
        <Text style={{
          fontSize: 24,
          fontWeight: '500',
          fontFamily: 'EB Garamond',
          color: '#292D32',
        }}>
          {user?.name}
        </Text>
        <View style={{height: 8}}/>

        <Text style={{
          fontSize: 12,
          fontWeight: '500',
          fontFamily: 'Gabarito',
          color: '#76766A',
        }}>
          You’ve tried 4 dishes so far.
        </Text>
      </View>
      <View style={{height: 23}}></View>
      <View style={styles.optionButton}>
        <Image style={styles.glassIcon} source={AppIcons.glassIcon} />
         <View style={styles.spaceBetweenRow}>
           <Text style={{
             fontSize: 16,
             fontWeight: '500',
             color: '#292D32',
           }}>
             Food sensitivities
           </Text>
           <Image style={styles.rightArrow} source={AppIcons.arrowRight} />
         </View>
        </View>



      <View style={{height: 23}}></View>
      <View style={styles.optionButton}>
        <Image style={styles.plateIcon} source={AppIcons.glassIcon} />
        <View style={styles.spaceBetweenRow}>
          <Text style={{
            fontSize: 16,
            fontWeight: '500',
            color: '#292D32',
          }}>
            Food preferences
          </Text>
          <Image style={styles.rightArrow} source={AppIcons.arrowRight} />
        </View>
      </View>
      </View>


      <View  style={{
        paddingLeft:23,
        paddingRight: 28,
        paddingBottom: 120,
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}>
        <OutlineButton
            title={'Log out'}
            onPress={handleLogout}
            backgroundColor={palette.primary.main }
            borderColor={palette.primary.main}
            color="#ffffff"
            // customChild={
            //   isLoading ? <ActivityIndicator color="#fff" /> : undefined
            // },
            disabled={false}
        />

        <Text style={{
          fontSize: 14,
          fontWeight: '400',
          fontFamily: 'EB Garamond',
          color: '#292D32',
        }}>
          © 2025 Bhogi Inc. | Patent Pending
        </Text>
      </View>


    </View>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.primary.bg,
    display: 'flex',
   justifyContent: 'flex-start'
  },
  text: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'EB Garamond',
  },
  profileContainer: {
    marginTop: 26,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 342,
    height: 153,
    borderRadius: 18,
    backgroundColor: '#FFFFFD',
    borderColor: '#AFAFA066',
  },
  profileInitialsCircle: {
    alignItems: 'center', justifyContent: 'center',
    height: 64, width: 64, borderRadius: 45, backgroundColor: '#F8F5F2',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    height: 60,
    borderRadius: 18,
    borderColor: '#AFAFA0',
    borderWidth: 1,
    paddingHorizontal: 23,
  },

  spaceBetweenRow:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 280,
    paddingLeft: 18,
  },

  glassIcon: {
    height: 29.13, width: 17.4, resizeMode: 'contain',
  },

  plateIcon: {
    height: 29.13, width: 17.4, resizeMode: 'contain',
  },
  rightArrow: {
    height: 24, width: 19.4,
    resizeMode: 'contain',
  }
});
