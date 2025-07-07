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

      <Text style={styles.title}>Coming Soon!</Text>
      <Text style={styles.subtitle}>We’re working on letting you eat with friends. In the
        meantime, invite them to use the app!</Text>

      <TouchableOpacity onPress={onLetsEat} style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Invite</Text>
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
    minHeight: 100,
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
    fontSize: 14,
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
    backgroundColor: '#525147', // Assuming primary button color
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
