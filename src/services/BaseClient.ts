import axios from 'axios';
import auth from '@react-native-firebase/auth';

const API_BASE_URL = 'https://backend-1054359019154.us-central1.run.app';

const baseClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
});

baseClient.interceptors.request.use(
  async config => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const idToken = await currentUser.getIdToken(true);
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default baseClient;
