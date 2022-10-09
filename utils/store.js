import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from '../features/users/currentUserSlice';
import userProfileReducer from '../features/users/userProfileSlice';
// import balancesReducer from './features/balancesSlice';
// import itemsReducer from './features/itemssSlice';

const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    userProfile: userProfileReducer,
    // balances: balancesReducer,
    // items: itemsReducer,
  }
})

export default store;