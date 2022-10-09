import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabaseClient';

export const getCurrentUser = createAsyncThunk("users/getCurrentUser", async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw error
  }

  if (!session?.user) {
    throw new Error('User not logged in')
  }

  return session.user
})

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: {
    entities: null,
    status: "idle",
  },
  reducers: {
  },
  extraReducers: {
    [getCurrentUser.pending](state) {
      state.status = "loading"
    },
    [getCurrentUser.fulfilled](state, action) {
      state.status = "idle"
      state.entities = action.payload
    },
  }
})

// export const {  } = currentUserSlice.actions
export default currentUserSlice.reducer