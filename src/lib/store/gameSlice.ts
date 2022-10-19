import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Difficulty } from '../constants';

export interface GameState {
  isGameInProgress: boolean;
  isGameFinished: boolean;
  difficulty: Difficulty;
}

const initialState: GameState = {
  isGameInProgress: false,
  isGameFinished: false,
  difficulty: Difficulty.EASY,
}

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.isGameInProgress = true;
      state.isGameFinished = false;
    },
    endGame: (state) => {
      state.isGameInProgress = false;
      state.isGameFinished = true;
    },
    restartGame: (state) => {
      state.isGameInProgress = false;
      state.isGameFinished = false;
    },
    setDifficulty: (state, action: PayloadAction<Difficulty>) => {
      state.difficulty = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { startGame, endGame, restartGame, setDifficulty } = gameSlice.actions;

export default gameSlice.reducer;
