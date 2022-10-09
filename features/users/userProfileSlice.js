import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabaseClient';

export const getProfile = createAsyncThunk("users/getProfile", async (id) => {
  let { data, error, status } = await supabase
  .from('profiles')
  .select('username, avatar_url')
  .eq('id', id)
  .single()

  if (error && status !== 406) {
    throw error
  }

  if (data) {
    return data
  }
  else return error
})

const currentUserSlice = createSlice({
  name: "userProfile",
  initialState: {
    entities: null,
    status: "idle",
  },
  reducers: {
  },
  extraReducers: {
    [getProfile.pending](state) {
      state.status = "loading"
    },
    [getProfile.fulfilled](state, action) {
      state.status = "idle"
      state.entities = action.payload
    },
  }
})

// export const {  } = currentUserSlice.actions
export default currentUserSlice.reducer