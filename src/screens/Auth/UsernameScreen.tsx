import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UsernameScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🧑 Username Screen</Text>
    </View>
  );
};

export default UsernameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
