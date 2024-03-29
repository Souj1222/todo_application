import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';

export const store = configureStore({
  //mention alll the reducers here
  reducer: {
    //slice:slicename
    auth: authSlice,
  },
});
