import { configureStore } from "@reduxjs/toolkit";

import playerPositionReducer from "./slices/playerPositionSlice";

export const store = configureStore({
  reducer: {
    playerPosition: playerPositionReducer,
  },
});
