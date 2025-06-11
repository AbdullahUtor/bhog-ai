import React, { useRef, useCallback, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image, Platform, Text, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import HomeScreen from '../screens/Home/HomeScreen';
import MapScreen from '../screens/Map/MapScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import BookmarkScreen from '../screens/Bookmarks/BookmarkScreen';
import CustomDockedButton from '../components/common/CustomDockedButton';
 // Adjust path as needed
import AppIcons from '../utils/Icons';
import palette from '../utils/colors';
import DinnerDateSheet from "../components/common/DinnerDateSheet.tsx";

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
    // Bottom sheet ref and snap points
    const bottomSheetRef = useRef<BottomSheet>(null);
    // Use 'CONTENT_HEIGHT' for auto-sizing based on content
    const snapPoints = React.useMemo(() => ['35%'], []);
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    // Handle opening bottom sheet
    const handleOpenBottomSheet = useCallback(() => {
        bottomSheetRef.current?.expand();
        setIsBottomSheetOpen(true);
    }, []);

    // Handle closing bottom sheet
    const handleCloseBottomSheet = useCallback(() => {
        bottomSheetRef.current?.close();
        setIsBottomSheetOpen(false);
    }, []);

    // Handle sheet changes
    const handleSheetChanges = useCallback((index: number) => {
        setIsBottomSheetOpen(index >= 0);
    }, []);

    // Render backdrop component
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

    // Handle Let's Eat action
    const handleLetsEat = useCallback(() => {
        // Add your Let's Eat logic here
        console.log('Let\'s Eat pressed!');
        handleCloseBottomSheet();
    }, [handleCloseBottomSheet]);

    // Handle Change User action
    const handleChangeUser = useCallback(() => {
        // Add your Change User logic here
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
                            {
                                position: 'absolute',
                                height: 70,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                                backgroundColor: '#FAFAF7',
                                elevation: 10,
                                borderTopWidth: 0,
                                paddingBottom: Platform.OS === 'ios' ? 30 : 10,
                                opacity: isBottomSheetOpen ? 0 : 1,
                                transform: [{ translateY: isBottomSheetOpen ? 100 : 0 }],

                            },
                            // Ensure tab bar is always on top
                            { zIndex: 1000 }
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
                                <CustomDockedButton
                                    {...props}
                                    onPress={handleOpenBottomSheet}
                                />
                            ),
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

                {/* Bottom Sheet */}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1} // Start closed
                    snapPoints={snapPoints}
                    enablePanDownToClose={true}
                    onChange={handleSheetChanges}
                    backdropComponent={renderBackdrop}
                    enableDynamicSizing={true}
                    backgroundStyle={{
                        backgroundColor: 'white',
                    }}
                    handleIndicatorStyle={{
                        backgroundColor: '#E1E1E1',
                    }}
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
    bottomSheetContent: {
        flex: 1,
    },
});

export default MainTabs;