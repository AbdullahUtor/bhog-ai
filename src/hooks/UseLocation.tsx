import { useEffect, useState } from 'react';
import { getLocation, LocationData } from '../services/LocationService';

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const loc = await getLocation();
      setLocation(loc);
      setLoading(false);
    };
    fetch();
  }, []);

  return { location, loading };
};
