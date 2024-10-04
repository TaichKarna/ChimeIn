export const createUserSlice = (set) => ({
    user: {
      id: null,
      name: '',
      setUser: (userData) => set((state) => ({
        user: { ...state.user, ...userData },
      })),
      clearUser: () => set({ user: { id: null, name: '' } }),
    },
  });