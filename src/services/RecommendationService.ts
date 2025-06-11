import baseClient from './BaseClient';

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
  latitude: string;
  longitude: string;
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
}

interface RestaurantsResponse {
  restaurants: Restaurant[];
}

interface RecommendationsResponse {
  results: FoodPost[];
}

export class FoodApiService {

  /**
   * Fetch closest restaurants based on user location
   * @param radius - Optional radius parameter (if API supports it)
   * @returns Promise<Restaurant[]>
   */
  static async getClosestRestaurants(
    radius: number = 100,
    latitude: number = 38.897095,
    longitude: number = -77.006332
  ): Promise<any> {
    try {
      const params = {
        radius,
        latitude,
        longitude
      };

      const response = await baseClient.get(
        '/restaurants/closest-restaurant',
        { params }
      );

      return response.data.restaurants;
    } catch (error) {
      console.error('Error fetching closest restaurants:', error);
      throw new Error('Failed to fetch closest restaurants');
    }
  }

  /**
   * Fetch food recommendations based on restaurant IDs
   * @param restaurantIds - Array of restaurant IDs
   * @returns Promise<FoodPost[]>
   */
  static async getRecommendations(restaurantIds: string[]): Promise<FoodPost[]> {
    try {
      const response = await baseClient.post<RecommendationsResponse>('/recommendations/', {
        restaurant_ids: restaurantIds,
      });
      return response.data.results;
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw new Error('Failed to fetch recommendations');
    }
  }

  /**
   * Utility function to calculate walking time from distance
   * @param walkingDistance - Distance in meters
   * @param walkingSpeedKmh - Walking speed in km/h (default: 5 km/h)
   * @returns Formatted walking time string
   */
  static calculateWalkingTime(walkingDistance: number, walkingSpeedKmh: number = 5): string {
    // Convert km/h to m/min: 5 km/h = 83.33 m/min
    const walkingSpeedMPerMin = (walkingSpeedKmh * 1000) / 60;
    const walkingTimeMinutes = Math.round(walkingDistance / walkingSpeedMPerMin);
    return `${walkingTimeMinutes} min`;
  }

  /**
   * Main function to get food posts with restaurant data
   * @param radius - Optional radius for restaurant search
   * @returns Promise<FoodPost[]> - Enriched food posts with restaurant info
   */
  static async getFoodPostsWithRestaurantData(radius?: number): Promise<FoodPost[]> {
    try {
      // Step 1: Fetch closest restaurants
      const restaurants = await this.getClosestRestaurants(radius);

      if (restaurants.length === 0) {
        return [];
      }

      // Step 2: Extract restaurant IDs
      const restaurantIds = restaurants.map(restaurant => restaurant.restaurant_id);

      // Step 3: Fetch recommendations
      const recommendations = await this.getRecommendations(restaurantIds);

      // Step 4: Enrich recommendations with restaurant data
      const enrichedFoodPosts = recommendations.map(recommendation => {
        const restaurant = restaurants.find(r => r.restaurant_id === recommendation.restaurant_id);
        return {
          ...recommendation,
          restaurantName: restaurant?.restaurant_name || 'Unknown Restaurant',
          walkingTime: restaurant
            ? this.calculateWalkingTime(restaurant.walking_distance)
            : '0 min',
        };
      });

      return enrichedFoodPosts;
    } catch (error) {
      console.error('Error in getFoodPostsWithRestaurantData:', error);
      throw error;
    }
  }
}

export default FoodApiService;
