import { io } from 'socket.io-client';

export const socket = io("http://192.168.29.209:3000", {
    autoConnect: true
})