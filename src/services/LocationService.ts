import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
}

// Washington, DC fallback
const DEFAULT_LOCATION: LocationData = {
  latitude: 38.89511,
  longitude: -77.03637,
  city: 'Washington, DC',
};

const requestLocationPermission = async (): Promise<boolean> => {
  try {
    if (Platform.OS === 'android') {
      // Check if permission is already granted
      const checkResult = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (checkResult) {
        return true;
      }

      // Request permission
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // iOS permission handling
      const permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      const checkResult = await check(permission);

      if (checkResult === RESULTS.GRANTED) {
        return true;
      }

      if (checkResult === RESULTS.DENIED) {
        const requestResult = await request(permission);
        return requestResult === RESULTS.GRANTED;
      }

      if (checkResult === RESULTS.BLOCKED) {
        Alert.alert(
          'Location Permission Required',
          'Location access is required for this feature. Please enable it in Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Settings', onPress: () => {

              }}
          ]
        );
        return false;
      }

      return false;
    }
  } catch (error) {
    console.warn('Permission request failed:', error);
    return false;
  }
};

const getCurrentPosition = (): Promise<Geolocation.GeoPosition> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => resolve(position),
      (error) => reject(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
        showLocationDialog: true,
        forceRequestLocation: true,
        forceLocationManager: false,
        distanceFilter: 0,
      }
    );
  });
};

const reverseGeocode = async (latitude: number, longitude: number): Promise<string> => {
  const apiKey = 'AIzaSyAK6QcV7ICRykJTlO22myjpe5jGJ6BEg-4';
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': 'location',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const city = data?.address?.city ||
      data?.address?.town ||
      data?.address?.village ||
      data?.address?.county ||
      data?.address?.state ||
      'Unknown Location';

    return city;
  } catch (error) {
    console.warn('Reverse geocoding failed:', error);
    return 'Unknown Location';
  }
};

export const getLocation = async (): Promise<LocationData> => {
  try {
    // Request location permission
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      console.log('Location permission denied, using default location');
      return DEFAULT_LOCATION;
    }

    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;

    const city = await reverseGeocode(latitude, longitude);

    return {
      latitude,
      longitude,
      city,
    };
  } catch (error) {
    console.warn('Location fetch failed, using fallback location:', error);
    return DEFAULT_LOCATION;
  }
};

// Alternative method that doesn't require react-native-permissions
export const getLocationWithoutPermissionsLib = async (): Promise<LocationData> => {
  try {
    let hasPermission = false;

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'This app needs access to your location to provide better services.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // For iOS, we'll rely on the native location manager
      // This will prompt the user automatically when getCurrentPosition is called
      hasPermission = true;
    }

    if (!hasPermission) {
      return DEFAULT_LOCATION;
    }

    const position = await getCurrentPosition();
    const { latitude, longitude } = position.coords;
    const city = await reverseGeocode(latitude, longitude);

    return {
      latitude,
      longitude,
      city,
    };
  } catch (error) {
    console.warn('Location fetch failed, using fallback location:', error);
    return DEFAULT_LOCATION;
  }
};
