import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  refreshToken: "",
  account: {},
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
    },

    setAccount: (state, action) => {
      state.account = action.payload;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.account = null;
    },
  },
});

export const { setAuthToken, setAccount, logout } = authSlice.actions;

export default authSlice.reducer;
