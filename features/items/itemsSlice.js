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
    itemAdded(state, action) {
      const items = state.entities
      const percentage = action.payload.balances.amount === 0 || action.payload.price === 0 ? 0 : Math.round(action.payload.balances.amount / action.payload.price * 100)
      items.push({...action.payload, percentage: percentage})
    },
    itemEdited(state, action) {
      const items = state.entities
      const index = items.findIndex((item) => item.id === action.payload.id)
      const percentage = action.payload.balances.amount === 0 || action.payload.price === 0 ? 0 : Math.round(action.payload.balances.amount / action.payload.price * 100)
      items.splice(index, 1, {...action.payload, percentage: percentage})
    },
    itemDeleted(state, action) {
      const items = state.entities
      const index = items.findIndex((item) => item.id === action.payload.id)
      items.splice(index, 1)
    }
  },
  extraReducers: {
    [getItems.pending](state) {
      state.status = "loading"
    },
    [getItems.fulfilled](state, action) {
      const items = action.payload.map((item) => {
        const percentage = item.balances.amount === 0 || item.price === 0 ? 0 : Math.round(item.balances.amount / item.price * 100)
        return {...item, percentage: percentage}
      })
      state.status = "idle"
      state.entities = items
    }
  }
})

export const { itemAdded, itemEdited, itemDeleted } = itemsSlice.actions
export default itemsSlice.reducer