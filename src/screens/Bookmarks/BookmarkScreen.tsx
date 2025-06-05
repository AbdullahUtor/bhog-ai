import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookmarkScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🔖 Bookmark Screen</Text>
    </View>
  );
};

export default BookmarkScreen;

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
