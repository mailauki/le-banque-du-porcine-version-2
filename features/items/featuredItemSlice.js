import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabaseClient';

export const getFeaturedItem = createAsyncThunk("items/getFeaturedItem", async (id) => {
  let { data, error, status } = await supabase
    .from('items')
    .select('id, name, price, image, priority, balances ( id, name, amount )')
    .eq('user_id', id)
    .order('priority', 1)
    .limit(1)

  if (error && status !== 406) {
    throw error
  }

  if (data) {
    return data
  }
})

const featuredItemSlice = createSlice({
  name: "featuredItem",
  initialState: {
    entities: null,
    status: "idle",
  },
  reducers: {
  },
  extraReducers: {
    [getFeaturedItem.pending](state) {
      state.status = "loading"
    },
    [getFeaturedItem.fulfilled](state, action) {
      // const item = action.payload.map((item) => {
      //   const percentage = item.balances.amount === 0 || item.price === 0 ? 0 : Math.round(item.balances.amount / item.price * 100)
      //   return {...item, percentage: percentage}
      // })
      const item = action.payload[0]
      const percentage = item.balances.amount === 0 || item.price === 0 ? 0 : Math.round(item.balances.amount / item.price * 100)
      state.status = "idle"
      state.entities = {...item, percentage: percentage}
      // state.entities = item
    }
  }
})

export default featuredItemSlice.reducer