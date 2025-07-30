
import {FoodPost} from './RecommendationService.ts';
import baseClient from './BaseClient.ts';


export const postMapNavigationEvent = async (foodPost: FoodPost) => {
  try {
    const response = await baseClient.post('/navigation/state', {
      current_screen: 'restaurant-details',
      restaurant_id: foodPost.restaurant_id,
      dish_id: foodPost.dish_id,
      schedule_notification: true,
      notification_delay_ms: 30 * 60 * 1000,
    });

    console.log('🔔✅ NOTIFICATION SCHEDULED', response.data);
  } catch (error) {
    console.error('❌✅ Failed to post scheduling notification:', error);
  }
};
