import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  refreshToken: null,
  account: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.accessToken = action.payload.access_token;
      localStorage.setItem("access_token", action.payload.access_token);
      state.refreshToken = action.payload.refresh_token;
      localStorage.setItem("refresh_token", action.payload.refresh_token);
    },

    setAccount: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const { setAuthToken, setAccount } = authSlice.actions;

export default authSlice.reducer;
