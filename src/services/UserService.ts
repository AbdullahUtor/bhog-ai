import baseClient from './BaseClient';

export const fetchUserProfile = async () => {
  try {
    const response = await baseClient.get('/user/');
    const { user, selectedDishes, allergens } = response.data;

    const isNamePresent = !!user.name;
    const isPhonePresent = !!user.phone;

    return {
      isValidUser: isNamePresent && isPhonePresent,
      userData: user, selectedDishes, allergens,
    };
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    throw error;
  }
};
