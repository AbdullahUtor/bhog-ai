import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text, Image} from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import AppIcons from '../../utils/Icons.ts';

const CustomDockedButton: React.FC<BottomTabBarButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
       <Image style={styles.dockedIcon} source={AppIcons.userAddIcon}></Image>
      </View>
    </TouchableOpacity>
  );
};

export default CustomDockedButton;

const styles = StyleSheet.create({
  container: {
    top: -18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },

  button: {
    width: 50,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#525147',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },  // x: 0, y: 2
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },

 dockedIcon: {
    height: 32,
    width: 32,
    alignItems: 'center',
 },
});
