import { createSlice } from "@reduxjs/toolkit";

const requests = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      if (action.payload) state.push(...action.payload);
    },
    removeRequest: (state, action) => {
      const newState = state.filter((req) => req._id === action.payload);
      return newState;
    },
  },
});

export const { addRequests, removeRequest } = requests.actions;

export default requests.reducer;
