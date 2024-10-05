import { api_url } from "@/app/_layout"
import { getToken } from "@/store/authToken";

export const fetchChatMessages = async (chatId : string, page = 1, limit = 20) => {
    const token = await getToken();
    const response = await fetch(`${api_url}/messages/${chatId}?page=${page}&limit=${limit}`,{
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
});
    if (!response.ok) {
        throw new Error('Failed to fetch chat messages');
    }
    return response.json();
};
