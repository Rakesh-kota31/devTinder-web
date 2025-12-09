import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (state, action) => {
            return action.payload
        },
        updateUser: (state, action) => {
            return action.payload
        },
        removeUser: () => {
            return null
        }
    }
})

export const { addUser, updateUser, removeUser } = user.actions;

export default user.reducer;