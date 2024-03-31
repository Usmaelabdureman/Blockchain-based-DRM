import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: action.payload.username,
          token: action.payload.token,
        }),
      );
    },
  },
});

export const selectAuth = (state) => state.auth;
export const { setUser } = authSlice.actions;
export default authSlice.reducer;
