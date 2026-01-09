import { createSlice } from "@reduxjs/toolkit";

const connections = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    addConnections: (state, action) => {
      return action.payload;
    },
    //removeConnection: (state, action) => {
    //  const newState = state.filter((con) => con._id === action.payload);
    //  return newState;
    //},
    dropConnections: () => {
      return [];
    }
  },
});

export const { addConnections,dropConnections } = connections.actions;

export default connections.reducer;
