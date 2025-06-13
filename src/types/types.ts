// src/types/navigation.d.ts or types.ts
import {FoodPost} from '../services/RecommendationService.ts';

export type RootStackParamList = {
  Splash: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Username: undefined;
  Contact: { username: string };
  FoodQuiz: undefined;
  FoodAllergen: undefined;
  MainTabs: undefined;
  FoodDetails: {
    id: string;
    foodPost: FoodPost;
  };
};
