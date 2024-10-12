import { IMessage } from "react-native-gifted-chat";

export interface User {
  _id: string | number;
  name: string;
  avatar?: string;
}

export interface QuickReplies {
  type: 'radio' | 'checkbox';
  values: { title: string; value: string }[];
  keepIt?: boolean;
}

export interface ChatRoom {
  roomId: string;
  messages: IMessage[];
}

export interface ChatSlice {
  chatRooms: { [key: string]: ChatRoom }; 
  addMessage: (chatId: string, message: IMessage) => void;
  addMessages: (chatId: string, messages: IMessage[]) => void;
  getMessages: (chatId: string) => IMessage[];
  createRoom: (chatId: string) => void;
  clearRoom: (chatId: string) => void;
}

export const createChatSlice = (set: any, get: any): ChatSlice => ({
  chatRooms: {},

  addMessage: (chatId: string, message: IMessage) => {
    set((state: ChatSlice) => {
      const existingRoom = state.chatRooms[chatId];

      if (existingRoom) {
        const messageExists = existingRoom.messages.some((msg) => msg._id === message._id);

        if (!messageExists) {
          return {
            chatRooms: {
              ...state.chatRooms,
              [chatId]: {
                ...existingRoom,
                messages: [...existingRoom.messages, message],
              },
            },
          };
        }
      } else {
        return {
          chatRooms: {
            ...state.chatRooms,
            [chatId]: {
              roomId: chatId,
              messages: [message],
            },
          },
        };
      }

      return state;
    });
  },

  addMessages: (chatId: string, messages: IMessage[]) => {
    set((state: ChatSlice) => {
      const existingRoom = state.chatRooms[chatId];

      if (existingRoom) {
        const newMessages = messages.filter(
          (msg) => !existingRoom.messages.some((existingMsg) => existingMsg._id === msg._id)
        );

        return {
          chatRooms: {
            ...state.chatRooms,
            [chatId]: {
              ...existingRoom,
              messages: [...existingRoom.messages, ...newMessages],
            },
          },
        };
      } else {
        return {
          chatRooms: {
            ...state.chatRooms,
            [chatId]: {
              roomId: chatId,
              messages,
            },
          },
        };
      }
    });
  },

  getMessages: (chatId: string): IMessage[] => {
    const room = get().chatRooms[chatId];
    return room ? room.messages : [];
  },

  createRoom: (chatId: string) => {
    set((state: ChatSlice) => ({
      chatRooms: {
        ...state.chatRooms,
        [chatId]: {
          roomId: chatId,
          messages: [],
        },
      },
    }));
  },

  clearRoom: (chatId: string) => {
    set((state: ChatSlice) => ({
      chatRooms: {
        ...state.chatRooms,
        [chatId]: {
          ...state.chatRooms[chatId],
          messages: [],
        },
      },
    }));
  },
});
