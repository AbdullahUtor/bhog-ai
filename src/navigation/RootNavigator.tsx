import React from 'react';

import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/Auth/SignInScreen';
import UsernameScreen from '../screens/Auth/UsernameScreen';
import ContactScreen from '../screens/Auth/ContactScreen';
import FoodQuizScreen from '../screens/Auth/FoodQuizScreen';
import MainTabs from './MainTabs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types.ts';
import FoodDetails from '../screens/Food/FoodDetails.tsx';
import FoodAllergensScreen from '../screens/Auth/FoodAllergensScreen.tsx';
import FoodSensitivitiesScreen from '../screens/Auth/EditAllergens.tsx';
import EditFoodQuizScreen from '../screens/Auth/EditFoodQuizScreen.tsx';


const Stack = createNativeStackNavigator<RootStackParamList>();


const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Username" component={UsernameScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="FoodQuiz" component={FoodQuizScreen} />
      <Stack.Screen name="FoodAllergen" component={FoodAllergensScreen} />
      <Stack.Screen name="FoodSensitivities" component={FoodSensitivitiesScreen} />
      <Stack.Screen name="EditFoodQuiz" component={EditFoodQuizScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} />
    </Stack.Navigator>
  );
};


export default RootNavigator;




// <Stack.Screen name={"FoodSensitivities"} component={FoodSensitivitiesScreen}/>
