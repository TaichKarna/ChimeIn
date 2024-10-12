
export interface User {
  id: string | number;
  name: string;
  avatar?: string;
}

export interface UserSlice {
  user: User | null; 
  loading: boolean; 
  error: string | null; 
  setUser: (user: User) => void; 
  resetUser: () => void; 
  setLoading: (loading: boolean) => void; 
  setError: (errorMessage: string | null) => void; 
}

export const createUserSlice = (set: any): UserSlice => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user: User) => {
    set({ user, loading: false, error: null });
  },

  resetUser: () => {
    set({ user: null, loading: false, error: null });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },

  setError: (errorMessage: string | null) => {
    set({ error: errorMessage });
  },
});

