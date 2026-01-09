import { createSlice } from "@reduxjs/toolkit";

const requests = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newState = state.filter((req) => req._id === action.payload);
      return newState;
    },
    dropRequests: () => {
      return []
    }
  },
});

export const { addRequests, removeRequest, dropRequests } = requests.actions;

export default requests.reducer;
