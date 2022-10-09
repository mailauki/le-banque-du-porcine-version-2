import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabaseClient';

export const getItems = createAsyncThunk("items/getItems", async (id) => {
  let { data, error, status } = await supabase
    .from('items')
    .select('id, name, price, image, priority')
    .eq('user_id', id)

  if (error && status !== 406) {
    throw error
  }

  if (data) {
    return data
  }
})

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    entities: null,
    status: "idle",
  },
  reducers: {
  },
  extraReducers: {
    [getItems.pending](state) {
      state.status = "loading"
    },
    [getItems.fulfilled](state, action) {
      state.status = "idle"
      state.entities = action.payload
    }
  }
})

// export const {  } = itemsSlice.actions
export default itemsSlice.reducer