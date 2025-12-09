import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
    name: "card",
    initialState: [],
    reducers: {
        addCards : (state, action) => {
            state.push(...action.payload); 
        },
        removeCard: (state, action) => {
            const removedData = state.filter((u) => u._id !== action.payload);
            return removedData;
        }
    }
})

export const { addCards, removeCard } = cardSlice.actions;

export default cardSlice.reducer;