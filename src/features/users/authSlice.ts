import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  account?: {
    department: string;
    email: string;
    faculty: string;
    full_name: string;
    id: string | number;
    is_active: boolean;
    is_staff: boolean;
    is_volunteer: boolean;
    university: string;
    year: string | number;
  } | null;
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
      state.accessToken = "";
      state.refreshToken = "";
      state.account = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
