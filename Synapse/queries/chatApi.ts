import { getToken } from "@/store/authToken";
import { api_url } from "@/app/_layout";

export const createChat = async ({chatName = "", members = []} : {chatName: string, members: Array<string>}) => {
    const token = await getToken()
    const response = await fetch(`${api_url}/chats`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  `Bearer ${token}`
        },
        body: JSON.stringify({
            name: chatName,
            members: members, 
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating chat');
    }

    return await response.json(); 
};


export const fetchChatDetails = async (chatId : string) => {
    const token = await getToken();
    const response = await fetch(`${api_url}/chats/${chatId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching chat details');
    }

    return await response.json();
};


export const fetchAllChats = async () => {
    const token = await getToken();
    const response = await fetch(`${api_url}/chats`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error('Failed to fetch chats');
    }

    return response.json();
};
