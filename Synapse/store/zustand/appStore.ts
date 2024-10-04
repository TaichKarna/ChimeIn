import create from 'zustand';

import { createUserSlice } from './userSlice';
import { createFriendsSlice } from './userFriendsSlice';
import { createSettingsSlice } from './userSettingsSlice';
// Merge slices into a single store
const useAppStore = create((set) => ({
    ...createUserSlice(set),
    ...createFriendsSlice(set),
    ...createSettingsSlice(set),
  }));
  
  export default useAppStore;