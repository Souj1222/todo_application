import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions, consider it as a function which is responsible for updating redux state
  reducers: {
    //? this functions will be triggered by dispatch() whenever any operation related to authentication happens
    register: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});
// exporting reducer so that we can dispatch this in desired page(s) for updating redux state related to auth
export const { register, login, logout } = authSlice.actions;
// exporting the auth data object for consumption by page(s)
export const authDataInStore = (state) => state.auth;
//exporting the entire slice
export default authSlice.reducer;
