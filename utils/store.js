import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/users/currentUserSlice';
import userProfileReducer from '../features/users/userProfileSlice';
import balancesReducer from '../features/balances/balancesSlice';
import itemsReducer from '../features/items/itemsSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    userProfile: userProfileReducer,
    balances: balancesReducer,
    items: itemsReducer,
  }
})

export default store;