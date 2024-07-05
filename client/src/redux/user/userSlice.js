import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  error: null,
  loading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signinStart: (state) => {
        state.loading = true,
        state.error = null
    },
    signinSuccess: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null;
    },
    signinFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true,
      state.error = null
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false,
      state.error = action.payload
    },
    deleteStart: (state) => {
      state.loading = true,
      state.error = null
    },
    deleteSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.loading = false,
      state.error = action.payload
    },
    signOutSuccess: (state) => {
      state.currentUser = false,
      state.loading = false,
      state.error = false
    }
  },
})

// Action creators are generated for each case reducer function
export const {signinFailure, 
  signinStart, 
  signinSuccess,
  updateFailure,
  updateStart,
  updateSuccess,
  deleteFailure,
  deleteStart,
  deleteSuccess,
  signOutSuccess
} = userSlice.actions;

export default userSlice.reducer;