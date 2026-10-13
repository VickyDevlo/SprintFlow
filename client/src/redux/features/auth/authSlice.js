import { createSlice } from "@reduxjs/toolkit";

const loadUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const user = loadUser();

const initialState = {
  user,
  isAuthenticated: Boolean(user),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      try {
        localStorage.setItem("user", JSON.stringify(action.payload));
      } catch {}
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      try {
        localStorage.removeItem("user");
      } catch {}
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;