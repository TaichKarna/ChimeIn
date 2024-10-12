export interface CurrentChatRoomSlice {
    currentChatId: string | null; 
    setCurrentChatId: (chatId: string | null) => void; 
}

export const createCurrentChatRoomSlice = (set: (fn: (state: CurrentChatRoomSlice) => CurrentChatRoomSlice) => void) => ({
    currentChatId: null, 

    setCurrentChatId: (chatId: string | null) => {
        set((state) => ({
            ...state,
            currentChatId: chatId,
        }));
    },
});
