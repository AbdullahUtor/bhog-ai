import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions, Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOutFromGoogle } from '../../services/GoogleAuthService.ts';
import palette from '../../utils/colors.ts';
import AppBarWithLeading from '../../components/common/AppBar.tsx';
import AppIcons from '../../utils/Icons.ts';
import OutlineButton from '../../components/common/OutlineButton.tsx';
import { useUser } from '../../hooks/UserContext.tsx';
import getInitials from '../../utils/initials.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types.ts';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();
  const handleLogout = async () => {
    try {
      await signOutFromGoogle();
      navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }],
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  const goToFoodAllergens = ()=> {
    navigation.navigate('FoodSensitivities');
  }

  const goToFoodQuiz = ()=> {
    navigation.navigate('EditFoodQuiz');
  }

  return (
      <SafeAreaView style={styles.container}>
        <AppBarWithLeading />
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Profile</Text>

          <View style={styles.profileContainer}>
            <View style={styles.profileInitialsCircle}>
              <Text style={styles.initialsText}>
                {getInitials(user?.name)}
              </Text>
            </View>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userStats}>You’ve tried 0 dishes so far.</Text>
          </View>

          <View style={styles.spacer} />

          <Pressable
            onPress={() => {
            goToFoodAllergens();
              console.log('Food sensitivities pressed');
            }}
            style={styles.optionButton}>
            <Image style={styles.icon} source={AppIcons.glassIcon} />
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Food sensitivities</Text>
              <Image style={styles.arrowIcon} source={AppIcons.arrowRight} />
            </View>
          </Pressable>



          <View style={styles.spacer} />
          <Pressable
            onPress={() => {
              goToFoodQuiz();
              console.log('Food Preferences Pressed');
            }}
            style={styles.optionButton}>
            <Image style={styles.icon} source={AppIcons.plateIcon} />
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>Food preferences</Text>
              <Image style={styles.arrowIcon} source={AppIcons.arrowRight} />
            </View>
          </Pressable>

          <View style={styles.bottomSpace} />
          <View style={styles.footer}>
            <OutlineButton
                title={'Log out'}
                onPress={handleLogout}
                backgroundColor={palette.primary.main}
                borderColor={palette.primary.main}
                color="#ffffff"
                disabled={false}
            />
            <Text style={styles.footerText}>© 2025 Bhogi Inc. | Patent Pending</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.primary.bg,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'EB Garamond',
    marginTop: 20,
  },
  profileContainer: {
    marginTop: 26,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: '#FFFFFD',
    borderColor: '#AFAFA066',
    width: '100%',
  },
  profileInitialsCircle: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#F8F5F2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  initialsText: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'EB Garamond',
    color: '#AFAFA0',
  },
  userName: {
    fontSize: 24,
    fontWeight: '500',
    fontFamily: 'EB Garamond',
    color: '#292D32',
  },
  userStats: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Gabarito',
    color: '#76766A',
  },
  spacer: {
    height: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderRadius: 18,
    borderColor: '#AFAFA0',
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFF',
    width: '100%',
  },
  icon: {
    height: 29,
    width: 17,
    resizeMode: 'contain',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    paddingLeft: 16,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#292D32',
  },
  arrowIcon: {
    height: 24,
    width: 19,
    resizeMode: 'contain',
  },
  bottomSpace: {
    height: 40,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'EB Garamond',
    color: '#292D32',
  },
});
