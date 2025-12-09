import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      if (action.payload) state.push(...action.payload);
    },
    removeConnection: (state, action) => {
      const newState = state.filter((con) => con._id === action.payload);
      return newState;
    },
  },
});

export const { addConnections, removeConnection } = connections.actions;

export default connections.reducer;
