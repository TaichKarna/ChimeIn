import { getTokenSync } from '@/store/authToken';
import { io } from 'socket.io-client';

const token = getTokenSync();

export const socket = io("http://192.168.29.112:3000", {
    auth: {
        token: token
    },
    autoConnect: true
})