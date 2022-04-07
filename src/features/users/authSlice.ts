import { createSlice } from "@reduxjs/toolkit";
import { UserDetails } from "../../../types";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  account?: UserDetails | null;
}

const initialState: AuthState = {
  accessToken: "",
  refreshToken: "",
  account: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.access_token;
      state.refreshToken = action.payload.refresh_token;
      state.account = action.payload.account;
    },

    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.account = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
