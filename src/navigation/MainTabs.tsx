import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';

import MapScreen from '../screens/Map/MapScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CustomDockedButton from '../components/common/CustomDockedButton';
import { View, Text } from 'react-native';
import BookmarkScreen from '../screens/Bookmarks/BookmarkScreen.tsx';

const Tab = createBottomTabNavigator();

const DummyBottomSheet = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>This is the bottom sheet screen</Text>
  </View>
);

const MainTabs = () => {
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
        name="BottomSheetTrigger"
        component={DummyBottomSheet}
        options={{
          tabBarButton: (props) => <CustomDockedButton {...props} />,
        }}
      />
      <Tab.Screen name="Bookmarks" component={BookmarkScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
