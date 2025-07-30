import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AppBarWithLeading from '../../components/common/AppBar.tsx';
import getInitials from '../../utils/initials.ts';
import AppIcons from '../../utils/Icons.ts';
import OutlineButton from '../../components/common/OutlineButton.tsx';
import palette from '../../utils/colors.ts';

const BookmarkScreen = () => {



  return (
    <SafeAreaView style={styles.container}>
      <AppBarWithLeading />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Saved Dishes</Text>

        <View style={{
          height: 90,
        }}></View>
      <View style={styles.outerView}>
        <View style={styles.profileContainer}>
          <View style={styles.profileInitialsCircle}>
            <Image style={styles.icon} source={AppIcons.plateIcon} />
          </View>
          <Text style={styles.userName}>You haven’t saved anything yet!</Text>
          <Text style={styles.userStats}>Browse our recommended dishes and bookmark them to save them for later.</Text>
        </View>
      </View>

        <View style={styles.spacer} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default BookmarkScreen;

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

  outerView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    marginTop: 26,
    borderWidth: 1,
    alignItems: 'center',
    paddingVertical: 20,
    borderRadius: 18,
    backgroundColor: '#FFFFFD',
    borderColor: '#AFAFA066',
    width: '80%',
    paddingHorizontal: 20,
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
    textAlign: 'center',
    paddingBottom: 12,
  },
  userStats: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Gabarito',
    color: '#76766A',
    textAlign: 'center'
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
    height: 70,
    width: 70,
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
