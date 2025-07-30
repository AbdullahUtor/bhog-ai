import baseClient from './BaseClient';
import axios from 'axios';

// Interfaces
export interface Restaurant {
  restaurant_id: string;
  restaurant_name: string;
  description: string;
  facebook: string;
  instagram: string;
  restaurant_website: string;
  telephone_number: string;
  cuisines: string;
  address: string;
  city: string;
  country: string;
  state: string;
  area: string;
  latitude: number;
  longitude: number;
  straight_line_distance: number;
  walking_distance: number;
}

export interface Flavors {
  umami: number;
  salty: number;
  sweet: number;
  sour: number;
  bitter: number;
}

export interface FoodPost {
  dish_id: number;
  restaurant_id: string;
  name: string;
  description: string | null;
  distance: number;
  flavors: Flavors;
  ingredients: string[];
  google_place_id: string;
  allergens: string[];
  rating: number | null;
  review_count: number | null;
  dish_price: number | null;
  icon_url: string;
  restaurantName?: string;
  walkingTime?: string;
  lat?: number | null;
  lng?: number | null;

  // Added from Restaurant interface
  address?: string;
  city?: string;
  country?: string;
  state?: string;
  area?: string;
}

interface RecommendationsResponse {
  results: FoodPost[];
}

export class FoodApiService {
  static async getClosestRestaurants(
    radius: number = 100,
    latitude: number = 38.897095,
    longitude: number = -77.006332
  ): Promise<Restaurant[]> {
    try {
      const params = { radius, latitude, longitude };
      const response = await baseClient.get('/restaurants/closest-restaurant', { params });
      return response.data.restaurants;
    } catch (error) {
      console.error('Error fetching closest restaurants:', error);
      throw new Error('Failed to fetch closest restaurants');
    }
  }

  static async getRecommendations(restaurantIds: string[]): Promise<FoodPost[]> {
    try {
      const response = await baseClient.post<RecommendationsResponse>('/recommendations/', {
        restaurant_ids: restaurantIds,
      });
      console.log(response.data.results);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw new Error('Failed to fetch recommendations');
    }
  }

  static calculateWalkingTime(walkingDistance: number, walkingSpeedKmh: number = 5): string {
    const walkingSpeedMPerMin = (walkingSpeedKmh * 1000) / 60;
    const walkingTimeMinutes = Math.round(walkingDistance / walkingSpeedMPerMin);
    return `${walkingTimeMinutes} min`;
  }

  static async getLatLngFromPlaceId(placeId: string): Promise<{ lat: number; lng: number } | null> {
    const apiKey = 'AIzaSyAK6QcV7ICRykJTlO22myjpe5jGJ6BEg-4';
    const url = `https://places.googleapis.com/v1/places/${placeId}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'location',
        },
      });

      const location = response.data?.location;
      if (location?.latitude && location?.longitude) {
        return {
          lat: location.latitude,
          lng: location.longitude,
        };
      }

      return null;
    } catch (error) {
      console.error(`Failed to fetch lat/lng for placeId ${placeId}:`, error.response?.data || error.message);
      return null;
    }
  }


  static async getFoodPostsWithRestaurantData(radius?: number, lat?: number, long?: number): Promise<FoodPost[]> {
    try {
      const restaurants = await this.getClosestRestaurants(radius, lat, long);

      if (restaurants.length === 0) {
        return [];
      }

      const restaurantIds = restaurants.map(r => r.restaurant_id);
      const recommendations = await this.getRecommendations(restaurantIds);

      const enrichedFoodPosts = await Promise.all(
        recommendations.map(async (recommendation) => {
          const restaurant = restaurants.find(r => r.restaurant_id === recommendation.restaurant_id);

          let latLng = null;
          if (recommendation.google_place_id) {
            latLng = await this.getLatLngFromPlaceId(recommendation.google_place_id);

          } else {
            console.warn(`No Google Place ID found for dish_id: ${recommendation.dish_id}`);
          }

          return {
            ...recommendation,
            restaurantName: restaurant?.restaurant_name || 'Unknown Restaurant',
            walkingTime: restaurant
              ? this.calculateWalkingTime(restaurant.walking_distance)
              : '0 min',
            lat: latLng?.lat ?? null,
            lng: latLng?.lng ?? null,
            address: restaurant?.address,
            city: restaurant?.city,
            country: restaurant?.country,
            state: restaurant?.state,
            area: restaurant?.area,
          };
        })
      );


      return enrichedFoodPosts;
    } catch (error) {
      console.error('Error in getFoodPostsWithRestaurantData:', error);
      throw error;
    }
  }
}

export default FoodApiService;
