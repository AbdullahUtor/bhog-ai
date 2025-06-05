import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FoodQuizScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🍽️ Food Quiz Screen</Text>
    </View>
  );
};

export default FoodQuizScreen;

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
