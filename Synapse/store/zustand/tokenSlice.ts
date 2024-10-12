export interface TokenSlice {
    token: string | null; 
    setToken: (token: string | null) => void;  
    clearToken: () => void;  
}

export const createTokenSlice = (set: any) => ({
    token: null,  

    setToken: (token: string | null) => {
        set({ token });  
    },

    clearToken: () => {
        set({ token: null }); 
    },
});

