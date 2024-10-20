import { useMutation } from 'react-query';
import { useCallback } from 'react';
import useAppStore from '@/store/zustand/appStore';
import { IMessage } from 'react-native-gifted-chat';
import { api_url } from '@/app/_layout';
import { useSocket } from '@/sockets/useSocket';



const useSendMessage = () => {
    const addMessage = useAppStore((state) => state.addMessage);
    const token = useAppStore((state) => state.token);
    const {socket} = useSocket();
    
    const { mutate: sendMessage } = useMutation(
        async ({ chat, message }: { chat: any; message: IMessage }) => {
            return await sendMessageToServer(chat.id, message, token);
        },
        {
            onSuccess: (message, { chat }) => {
                addMessage(chat.id, message); 
                socket?.emit('chat message', {userId: chat.otherUser.id,chatId: chat.id, message})
            },
            onError: (error) => {
                console.error('Error sending message:', error);
            },
        }
    );

    const handleSendMessage = useCallback(
        (chat: any , message: IMessage) => {
            sendMessage({ chat, message });
        },
        [sendMessage]
    );

    return handleSendMessage;
};

const sendMessageToServer = async (chatId: string, message: IMessage, token: string | null): Promise<IMessage> => {
    if (!token) {
        throw new Error('Authorization token is missing');
    }

    try {
        const response = await fetch(`${api_url}/messages/${chatId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(message),
        });

        if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Failed to send message');
        }

        const result: IMessage = await response.json();
        return result;

    } catch (error) {
        console.error('Error sending message to server:', error);
        throw error; 
    }
};

export default useSendMessage;
