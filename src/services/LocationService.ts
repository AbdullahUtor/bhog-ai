import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

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

export const getLocation = async (): Promise<LocationData> => {
  try {
    let hasPermission = false;

    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      hasPermission = result === RESULTS.GRANTED;
    }

    if (!hasPermission) {
      return DEFAULT_LOCATION;
    }

    const position = await new Promise<Geolocation.GeoPosition>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        resolve,
        reject,
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    });

    const { latitude, longitude } = position.coords;

    // Reverse geocode using OpenStreetMap
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
    );
    const data = await res.json();
    const city =
      data?.address?.city ||
      data?.address?.town ||
      data?.address?.village ||
      data?.address?.state ||
      'Unknown';

    return {
      latitude,
      longitude,
      city,
    };
  } catch (error) {
    console.warn('Location fetch failed, using fallback.', error);
    return DEFAULT_LOCATION;
  }
};
