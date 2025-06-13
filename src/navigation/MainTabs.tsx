import React, { useRef, useCallback, useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  View,
  Image,
  Platform,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from '../screens/Home/HomeScreen';
import MapScreen from '../screens/Map/MapScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import BookmarkScreen from '../screens/Bookmarks/BookmarkScreen';
import CustomDockedButton from '../components/common/CustomDockedButton';
import AppIcons from '../utils/Icons';
import palette from '../utils/colors';
import DinnerDateSheet from '../components/common/DinnerDateSheet.tsx';

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
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = React.useMemo(() => ['35%'], []);

  const translateY = useRef(new Animated.Value(0)).current;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const animateTabBar = (toValue: number) => {
    Animated.timing(translateY, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleOpenBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
    animateTabBar(100); // Move tab bar down
    setIsBottomSheetOpen(true);
  }, []);

  const handleCloseBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    animateTabBar(0); // Bring tab bar back
    setIsBottomSheetOpen(false);
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    const isOpen = index >= 0;
    setIsBottomSheetOpen(isOpen);
    animateTabBar(isOpen ? 100 : 0);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={0.4}
      />
    ),
    []
  );

  const handleLetsEat = useCallback(() => {
    console.log("Let's Eat pressed!");
    handleCloseBottomSheet();
  }, [handleCloseBottomSheet]);

  const handleChangeUser = useCallback(() => {
    console.log('Change User pressed!');
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: palette.accent.accentDark,
            tabBarStyle: [
              styles.tabBarBase,
              {
                transform: [{ translateY }],
                opacity: translateY.interpolate({
                  inputRange: [0, 100],
                  outputRange: [1, 0],
                  extrapolate: 'clamp',
                }),
              },
            ],
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
              tabBarButton: (props) => (
                <CustomDockedButton {...props} onPress={handleOpenBottomSheet} />
              ),
            }}
          />
          <Tab.Screen
            name="Bookmarks"
            component={BookmarkScreen}
            options={{
              tabBarIcon: ({ focused }) => (
                <Image
                  source={AppIcons.bookmarkNavIcon}
                  style={iconStyle(focused)}
                />
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

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onChange={handleSheetChanges}
          backdropComponent={renderBackdrop}
          enableDynamicSizing={true}
          backgroundStyle={{ backgroundColor: 'white' }}
          handleIndicatorStyle={{ backgroundColor: '#E1E1E1' }}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            <DinnerDateSheet
              onClose={handleCloseBottomSheet}
              onLetsEat={handleLetsEat}
              onChangeUser={handleChangeUser}
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarBase: {
    position: 'absolute',
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FAFAF7',
    elevation: 10,
    borderTopWidth: 0,
    paddingBottom: Platform.OS === 'ios' ? 30 : 10,
    zIndex: 1000,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheetContent: {
    flex: 1,
  },
});

export default MainTabs;
