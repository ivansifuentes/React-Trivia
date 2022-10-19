import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type GameResult = {
  correct: number;
  incorrect: number;
};

export interface GameSeriesState {
  gameResults: Array<GameResult>;
};

const initialState: GameSeriesState = {
  gameResults: [],
};

export const gameSeriesSlice = createSlice({
  name: 'gameSeries',
  initialState,
  reducers: {
    addGameResult: (state, action: PayloadAction<GameResult>) => {
      console.log("action.payload");
      console.log(action.payload);
      console.log(state.gameResults);
      state.gameResults = [ ...state.gameResults, action.payload ];
    },
  },
});

export const { addGameResult } = gameSeriesSlice.actions;
export default gameSeriesSlice.reducer;
