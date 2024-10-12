import {create} from 'zustand'
import { createChatSlice } from './messageSlice';
import { createCurrentChatRoomSlice } from './currentChatSlice';
import { ChatSlice } from './messageSlice';
import { CurrentChatRoomSlice } from './currentChatSlice';
import { createTokenSlice, TokenSlice } from './tokenSlice';
import { createUserSlice, UserSlice } from './userSlice';

export type AppStore = ChatSlice & CurrentChatRoomSlice & TokenSlice & UserSlice; 


const useAppStore = create<AppStore>((set, get) => ({
    ...createChatSlice(set, get),
    ...createCurrentChatRoomSlice(set),
    ...createTokenSlice(set),
    ...createUserSlice(set)
  }));
  
  export default useAppStore;