// src/navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import MapScreen from '../screens/Map/MapScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import BookmarksScreen from '../screens/Bookmarks/BookmarkScreen';
import BottomSheetScreen from '../screens/BottomSheetScreen.tsx';
import CustomDockedButton from '../components/common/CustomDockedButton.tsx';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen
        name="BottomSheetScreen"
        component={BottomSheetScreen}
        options={{
          tabBarButton: (props) => (
            <CustomDockedButton {...props} /> // Your fancy middle button
          ),
        }}
      />
      <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
