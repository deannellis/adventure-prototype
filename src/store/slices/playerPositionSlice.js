import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  x: 200,
  y: 200,
  lastDirection: "down",
};
const playerSpeed = 5;
const diagonalSpeed = playerSpeed * 0.75;

export const playerPositionSlice = createSlice({
  name: "playerPosition",
  initialState,
  reducers: {
    setLastDirection: (state, action) => {
      state.lastDirection = action.payload;
    },
    incrementX: (state, action) => {
      state.x += action.payload.diagonal ? diagonalSpeed : playerSpeed;
    },
    incrementY: (state, action) => {
      state.y += action.payload.diagonal ? diagonalSpeed : playerSpeed;
    },
    decrementX: (state, action) => {
      state.x -= action.payload.diagonal ? diagonalSpeed : playerSpeed;
    },
    decrementY: (state, action) => {
      state.y -= action.payload.diagonal ? diagonalSpeed : playerSpeed;
    },
  },
});

export const {
  setLastDirection,
  incrementX,
  incrementY,
  decrementX,
  decrementY,
} = playerPositionSlice.actions;

export default playerPositionSlice.reducer;
