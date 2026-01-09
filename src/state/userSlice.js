import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    userDetails: null,
    isAuthenticated: false,
  },
  reducers: {
    addUser: (state, action) => {
      return {
        userDetails: action.payload,
        isAuthenticated: true,
      };
    },
    updateUser: (state, action) => {
      return {
        userDetails: action.payload,
        isAuthenticated: true,
      };
    },
    removeUser: () => {
      return {
        userDetails: null,
        isAuthenticated: false,
      };
    },
  },
});

export const { addUser, updateUser, removeUser } = user.actions;

export default user.reducer;
