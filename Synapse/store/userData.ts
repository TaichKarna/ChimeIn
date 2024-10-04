import * as SecureStore from 'expo-secure-store';

const USER_DATA_KEY = 'userData';

export const saveUserData = async (userData: { username: string; displayName: string; profilePicture: string }) => {
    try {
        const jsonString = JSON.stringify(userData);
        await SecureStore.setItemAsync(USER_DATA_KEY, jsonString);
    } catch (error) {
        console.error('Error saving user data:', error);
    }
};

export const getUserData = async () => {
    try {
        const jsonString = await SecureStore.getItemAsync(USER_DATA_KEY);
        if (jsonString) {
            return JSON.parse(jsonString);
        }
        return null; 
    } catch (error) {
        console.error('Error retrieving user data:', error);
        return null;
    }
};

export const deleteUserData = async () => {
    try {
        await SecureStore.deleteItemAsync(USER_DATA_KEY);
    } catch (error) {
        console.error('Error deleting user data:', error);
    }
};
