import { useEffect, useState, useCallback } from 'react';
import { getLocation, getLocationWithoutPermissionsLib, LocationData } from '../services/LocationService';

interface UseLocationReturn {
  location: LocationData | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useLocation = (): UseLocationReturn => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try with react-native-permissions first, fallback to alternative method
      let locationData: LocationData;

      try {
        locationData = await getLocation();
      } catch (permissionError) {
        console.warn('Permission library failed, trying alternative method:', permissionError);
        locationData = await getLocationWithoutPermissionsLib();
      }

      setLocation(locationData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Location fetch failed:', err);

      // Set default location as fallback
      setLocation({
        latitude: 38.89511,
        longitude: -77.03637,
        city: 'Washington, DC',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  return {
    location,
    loading,
    error,
    refetch
  };
};
