import { StateCreator } from "zustand"

interface VerfifyStoreSlice{
    confirm: object,
    addConfirm: (confirm : object) => void
    removeConfirm: () => void
}

export const createVerfifySlice = (set) => ({
    confirm: null,
    addConfirm: (confirm) => set((state) => ({confirm: confirm })),
    removeConfirm: (confirm) => set((state) => ({confirm: null}))
})