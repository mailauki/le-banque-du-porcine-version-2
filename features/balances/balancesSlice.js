import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { supabase } from '../../utils/supabaseClient';

export const getBalances = createAsyncThunk("balances/getBalances", async (id) => {
  let { data, error, status } = await supabase
  .from('balances')
  .select('id, name, amount')
  .eq('user_id', id)

  if (error && status !== 406) {
    throw error
  }

  if (data) {
    return data
  }
})

const balancesSlice = createSlice({
  name: "balances",
  initialState: {
    entities: null,
    status: "idle",
  },
  reducers: {
    balanceAdded(state, action) {
      const balances = state.entities
      balances.push(action.payload)
    },
    balanceEdited(state, action) {
      const balances = state.entities
      const index = balances.findIndex((balance) => balance.id === action.payload.id)
      balances.splice(index, 1, action.payload)
    },
    balanceDeleted(state, action) {
      const balances = state.entities
      const index = balances.findIndex((balance) => balance.id === action.payload.id)
      balances.splice(index, 1)
    }
  },
  extraReducers: {
    [getBalances.pending](state) {
      state.status = "loading"
    },
    [getBalances.fulfilled](state, action) {
      state.status = "idle"
      state.entities = action.payload
    },
  }
})

export const { balanceAdded, balanceEdited, balanceDeleted } = balancesSlice.actions
export default balancesSlice.reducer