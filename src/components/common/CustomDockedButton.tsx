import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';

const CustomDockedButton: React.FC<BottomTabBarButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.plus}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomDockedButton;

const styles = StyleSheet.create({
  container: {
    top: -30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF8C00',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  plus: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
});
