export const createSettingsSlice = (set) => ({
    settings: {
      theme: 'light',
      setTheme: (newTheme) => set((state) => ({
        settings: { ...state.settings, theme: newTheme },
      })),
    },
  });
  