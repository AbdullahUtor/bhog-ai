import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity, StyleSheet,
} from 'react-native';
import ItemContainer from '../../components/common/ItemContainer.tsx';
import RecommendationService, {FoodPost} from '../../services/RecommendationService.ts';
import palette from '../../utils/colors.ts';
import AppBarWithLeading from '../../components/common/AppBar.tsx';
import {useUser} from '../../hooks/UserContext.tsx'; // Adjust path as needed

const HomeScreen: React.FC = () => {
  const [foodPosts, setFoodPosts] = useState<FoodPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  // Main function to fetch food posts
  const fetchFoodPosts = async () => {
    try {
      setError(null);
      const foodPostsData = await RecommendationService.getFoodPostsWithRestaurantData();
      setFoodPosts(foodPostsData);
    } catch (error) {
      console.error('Error in fetchFoodPosts:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch food posts';
      setError(errorMessage);
      Alert.alert(
        'Error',
        'Failed to load food recommendations. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchFoodPosts();
      setLoading(false);
    };

    loadData();
  }, []);

  // Pull to refresh handler
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFoodPosts();
    setRefreshing(false);
  };

  // Retry handler for error state
  const handleRetry = async () => {
    setLoading(true);
    await fetchFoodPosts();
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: 'EB Garamond', color: '#262020',  fontSize: 36, marginBottom: 10, textAlign: 'center', paddingHorizontal: 22,  }}>
          Welcome back{user?.name ? `, ${user.name}` : ''}! Hungry?
        </Text>

        <Text style={{ fontFamily: 'Gabarito', color: '#76766A',  fontSize: 14, marginBottom: 10, textAlign: 'center', paddingHorizontal: 90, paddingTop: 50, paddingBottom: 10  }}>
          Give us a moment as we load your recommendations...
        </Text>

        <ActivityIndicator size="large" color="#525147" />
      </View>
    );
  }

  if (error && foodPosts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18, marginBottom: 10, textAlign: 'center' }}>
          Unable to load recommendations
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' }}>
          {error}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={handleRetry}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppBarWithLeading />

    <ScrollView
      style={{ flex: 1, paddingTop: 40 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
        {foodPosts.length === 0 ? (
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 16, color: '#666' }}>
              No recommendations found
            </Text>
            <Text style={{ fontSize: 14, color: '#999', marginTop: 5 }}>
              Try adjusting your location or preferences
            </Text>
          </View>
        ) : (
          foodPosts.map((foodPost) => (
            <ItemContainer key={foodPost.dish_id} foodPost={foodPost} />
          ))
        )}

      <View style={{ height: 82 }}></View>

    </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.primary.bg,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
  },
});
