import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import cardReducer from "./cardSlice";
import requestsReducer from "./requestSlice";
import connectionsReducer from "./connectionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cards: cardReducer,
    requests: requestsReducer,
    connections: connectionsReducer,
  },
});
