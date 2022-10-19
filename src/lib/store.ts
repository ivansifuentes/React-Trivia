import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './store/counterSlice';
import questionsReducer from './store/loadQuestions';
import gameReducer from './store/gameSlice';
import gameSeriesReducer from './store/gameSeriesSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    game: gameReducer,
    questions: questionsReducer,
    gameSeries: gameSeriesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch