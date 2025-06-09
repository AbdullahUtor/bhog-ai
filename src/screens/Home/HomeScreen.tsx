import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AppBarWithLeading from '../../components/common/AppBar.tsx';
import {FoodPost} from '../../types/foodpost.ts';
import ItemContainer from '../../components/common/ItemContainer.tsx';
import {foodPosts} from '../../data/FoodDummyData.tsx';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <AppBarWithLeading />

      <FlatList
        style={{ paddingTop: 30 }}
        data={foodPosts}
        renderItem={({ item }: { item: FoodPost }) => (
          <ItemContainer foodPost={item} />
        )}
        keyExtractor={(item) => item.id || ''}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
    </View>
  );
};

export default HomeScreen;

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
