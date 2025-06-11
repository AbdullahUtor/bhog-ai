import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  // Dimensions,
} from 'react-native';
import palette from '../../utils/colors.ts';
import AppIcons from '../../utils/Icons.ts';

// const { width, height } = Dimensions.get('window');

interface DinnerDateSheetProps {
  onClose: () => void;
  onLetsEat: () => void;
  onChangeUser: () => void;
}

const DinnerDateSheet: React.FC<DinnerDateSheetProps> = ({
                                                           onClose,
                                                           onLetsEat,
                                                           onChangeUser
                                                         }) => {
  return (
    <View style={styles.container}>
      {/* Drag Indicator */}
      <View style={styles.indicatorContainer}>

      </View>

      {/* Close Button */}
      {/*<View style={styles.closeButtonContainer}>*/}
      {/*  <TouchableOpacity onPress={onClose} style={styles.closeButton}>*/}
      {/*    <Image*/}
      {/*      source={AppIcons.close} // You'll need to add this to your Icons*/}
      {/*      style={styles.closeIcon}*/}
      {/*    />*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}

      {/* Title Section */}
      <Text style={styles.title}>Dinner Date</Text>
      <Text style={styles.subtitle}>Eat with a friend</Text>

      {/* User Info Card */}
      <View style={styles.userCard}>
        <Image
          source={AppIcons.dummyUser} // Update path as needed
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Kim B.</Text>
          <Text style={styles.userTitle}>Gourmet Guru</Text>
          <Text style={styles.userMeals}>2 meals shared</Text>
        </View>
        <TouchableOpacity
          onPress={onChangeUser}
          style={styles.changeButton}
        >
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Let's Eat Button */}
      <TouchableOpacity onPress={onLetsEat} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Let's Eat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    paddingHorizontal: 21,
    paddingBottom: 32,
    minHeight: 300,
  },
  indicatorContainer: {
    alignItems: 'center',
    paddingTop: 16,

  },
  indicator: {
    width: 45,
    height: 5,
    resizeMode: 'contain',
  },
  closeButtonContainer: {
    alignItems: 'flex-end',

  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#F8F5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'EB Garamond',
    fontSize: 24,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 4,
    letterSpacing: 0.01,
  },
  subtitle: {
    fontFamily: 'Gabarito',
    fontSize: 12,
    color: palette.accent.accentDark,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 17.5,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    marginBottom: 14,
  },
  userImage: {
    width: 56,
    height: 56,
    borderRadius: 18,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontFamily: 'EB Garamond',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
    color: '#000',
  },
  userTitle: {
    fontFamily: 'Gabarito',
    fontSize: 14,
    color: palette.accent.accentDark,
    fontWeight: '400',
    lineHeight: 16.8, // height: 1.2
    marginBottom: 2,
  },
  userMeals: {
    fontFamily: 'Gabarito',
    fontSize: 14,
    color: palette.accent.accentDark,
    fontWeight: '400',
    lineHeight: 16.8, // height: 1.2
  },
  changeButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#262020',
  },
  changeText: {
    fontFamily: 'EB Garamond',
    fontSize: 16,
    fontWeight: '400',
    color: '#262020',
  },
  primaryButton: {
    backgroundColor: '#292D32', // Assuming primary button color
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  primaryButtonText: {
    fontFamily: 'EB Garamond',
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
});

export default DinnerDateSheet;