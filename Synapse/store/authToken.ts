import * as SecureStore from 'expo-secure-store';


const storeToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync('jwtToken', token);
        console.log('Token stored successfully!');
    } catch (error) {
        console.error('Error storing token:', error);
    }
};

const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('jwtToken');
        if (token) {
            return token;
        } else {
            console.log('No token found.');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

const getTokenSync =  () => {
    try {
        const token = SecureStore.getItem('jwtToken');
        if (token) {
            return token;
        } else {
            console.log('No token found.');
            return null;
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
        return null;
    }
};

const deleteToken = async () => {
    try {
        await SecureStore.deleteItemAsync('jwtToken');
        console.log('Token deleted successfully!');
    } catch (error) {
        console.error('Error deleting token:', error);
    }
};

export {storeToken, getToken, deleteToken, getTokenSync}