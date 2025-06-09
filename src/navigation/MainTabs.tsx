// import React from 'react';

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import MapScreen from '../screens/Map/MapScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import CustomDockedButton from '../components/common/CustomDockedButton';
import BookmarkScreen from '../screens/Bookmarks/BookmarkScreen.tsx';
import AppIcons from '../utils/Icons.ts'; // Make sure this has { homeIcon, mapIcon, bookmarkNavIcon, emojiIcon }
import palette from '../utils/colors.ts';
import {View, Image, Platform, Text} from 'react-native';

const Tab = createBottomTabNavigator();

const DummyBottomSheet = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>This is the bottom sheet screen</Text>
  </View>
);

const iconStyle = (focused: boolean) => ({
  width: 24,
  height: 24,
  tintColor: focused ? palette.accent.accentDark : '#525147',
});

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: palette.accent.accentDark,
        tabBarStyle: {
          position: 'absolute',
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: '#ffffffcc',
          elevation: 10,
          borderTopWidth: 0,
          paddingBottom: Platform.OS === 'ios' ? 30 : 10,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={AppIcons.homeIcon} style={iconStyle(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={AppIcons.mapIcon} style={iconStyle(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="BottomSheetTrigger"
        component={DummyBottomSheet}
        options={{
          tabBarButton: (props) => <CustomDockedButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Bookmarks"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={AppIcons.bookmarkNavIcon} style={iconStyle(focused)} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={AppIcons.emojiIcon} style={iconStyle(focused)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabs;
