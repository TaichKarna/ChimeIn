import { create } from 'zustand'
import { createVerfifySlice } from './verify.store'

export const useBoundStore = create((...a) => ({
    ...createVerfifySlice(...a),
}))