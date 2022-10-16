import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/users/currentUserSlice';
import userProfileReducer from '../features/users/userProfileSlice';
import balancesReducer from '../features/balances/balancesSlice';
import itemsReducer from '../features/items/itemsSlice';
import featuredItemReducer from '../features/items/featuredItemSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    userProfile: userProfileReducer,
    balances: balancesReducer,
    items: itemsReducer,
    featuredItem: featuredItemReducer
  }
})

export default store;