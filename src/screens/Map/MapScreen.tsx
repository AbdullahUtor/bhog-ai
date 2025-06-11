import React, { useRef, useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import FoodCard from '../../components/common/FoodCard.tsx';
import AppIcons from '../../utils/Icons.ts';
import palette from '../../utils/colors.ts';
import FoodApiService, { FoodPost } from '../../services/RecommendationService.ts';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types.ts';

const { width } = Dimensions.get('window');

const CARD_WIDTH = width * 0.82;
const CARD_HEIGHT = 193;
type MapScreenNavProp = NativeStackNavigationProp<RootStackParamList>;

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);
  const listRef = useRef<FlatList<FoodPost>>(null);

  const navigation = useNavigation<MapScreenNavProp>();

  const [foodPosts, setFoodPosts] = useState<FoodPost[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Center map on selected index location
  const centerMapOn = (index: number) => {
    const post = foodPosts[index];
    if (!post?.lat || !post?.lng) return;

    const region: Region = {
      latitude: post.lat,
      longitude: post.lng,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    mapRef.current?.animateToRegion(region, 350);
  };

  // Handle FlatList scroll event, update selected marker and center map
  const handleCardScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (CARD_WIDTH + 20));
    if (index !== selectedIndex && index >= 0 && index < foodPosts.length) {
      setSelectedIndex(index);
      centerMapOn(index);
    }
  };

  // When a marker is pressed, scroll to corresponding card and center map
  const handleMarkerPress = (index: number) => {
    listRef.current?.scrollToIndex({ index, animated: true });
    setSelectedIndex(index);
    centerMapOn(index);
  };

  // Fetch food posts on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await FoodApiService.getFoodPostsWithRestaurantData();
        if (!data || data.length === 0) {
          setError('No restaurants found.');
        } else {
          setFoodPosts(data);
          setError(null);
          // Center map on first location initially
          setTimeout(() => centerMapOn(0), 500);
        }
      } catch (e) {
        console.error('Failed to load food posts:', e);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={palette.accent.accentDark} />
        <Text style={styles.loadingText}>Loading restaurants...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Text onPress={() => {
          setError(null);
          setLoading(true);
          FoodApiService.getFoodPostsWithRestaurantData()
            .then(data => {
              setFoodPosts(data);
              setLoading(false);
            })
            .catch(() => {
              setError('Failed to reload data.');
              setLoading(false);
            });
        }} style={styles.retryText}>
          Tap to Retry
        </Text>
      </View>
    );
  }

  if (foodPosts.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>No restaurants available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: foodPosts[0].lat || 37.78825,
          longitude: foodPosts[0].lng || -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {foodPosts.map((post, index) => (
          <Marker
            key={`${post.dish_id}-${index}`}
            coordinate={{
              latitude: post.lat ?? 0,
              longitude: post.lng ?? 0,
            }}
            onPress={() => handleMarkerPress(index)}
          >
            <Image source={AppIcons.restaurantMarker} style={styles.walkIcon} />
          </Marker>
        ))}
      </MapView>

      <View style={styles.cardContainer}>
        <FlatList
          ref={listRef}
          data={foodPosts}
          keyExtractor={(item) => item.dish_id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          snapToInterval={CARD_WIDTH + 20}
          decelerationRate="fast"
          contentContainerStyle={styles.cardListContent}
          onScroll={handleCardScroll}
          scrollEventThrottle={16}
          getItemLayout={(_r, index) => ({
            length: CARD_WIDTH + 20,
            offset: (CARD_WIDTH + 20) * index,
            index,
          })}
          renderItem={({ item }) => (
            <FoodCard
              item={item}
              onNotForMe={() => console.log('Not for me pressed on', item.name)}
              onViewDetails={() => {
                navigation.navigate('FoodDetails', {
                  id: item.dish_id.toString(),
                  foodPost: item,
                });
              }}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

  walkIcon: {
    width: 52.32,
    height: 58,
    resizeMode: 'contain',
  },

  cardContainer: {
    position: 'absolute',
    bottom: 130,
    width: '100%',
    height: CARD_HEIGHT,
  },

  cardListContent: {
    paddingHorizontal: 10,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: palette.accent.accentDark,
    fontFamily: 'Gabarito',
  },

  errorText: {
    fontSize: 18,
    color: 'red',
    marginBottom: 10,
    fontFamily: 'Gabarito',
  },

  retryText: {
    fontSize: 16,
    color: palette.accent.accentDark,
    textDecorationLine: 'underline',
    fontFamily: 'Gabarito',
  },
});
