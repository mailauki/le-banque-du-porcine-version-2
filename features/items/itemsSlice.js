import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabaseClient';

export const getItems = createAsyncThunk("items/getItems", async (id) => {
  let { data, error, status } = await supabase
    .from('items')
    .select('id, name, price, image, priority, balances ( id, name, amount )')
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
      const items = action.payload.map((item) => {
        return {...item, percentage: Math.round(item.balances.amount / item.price * 100)}
      })
      state.status = "idle"
      state.entities = items
    }
  }
})

// export const {  } = itemsSlice.actions
export default itemsSlice.reducer