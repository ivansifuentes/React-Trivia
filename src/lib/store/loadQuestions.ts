import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Difficulty } from "../constants";

type UserAnswer = {
  value: string;
  isCorrect: boolean;
};

type Question = {
  category: string;
  type: string;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: Array<string>;
  userAnswer?: UserAnswer;
};

type AnswerGiven = {
  idx: number;
  value: string;
};

const fetchTriviaQuestions = createAsyncThunk(
  'questions/fetch',
  // Declare the type your function argument here:
  async (difficulty: Difficulty) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`)
    return (await response.json())
  }
)

interface QuestionsState {
  questions: Array<Question>;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  questions: [],
  loading: 'idle',
} as QuestionsState;

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    saveAnswer: (state, action: PayloadAction<AnswerGiven>) => {
      const { idx, value } = action.payload;
      const updated = state.questions.map((q, i) => {
        if (idx === i) {
          const userAnswer: UserAnswer = {
            value,
            isCorrect: q.correct_answer === value ? true : false
          }
          return {
            ...q,
            userAnswer
          }
        }
        return {
          ...q,
        }
      });
      state.questions = updated;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchTriviaQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.results;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchTriviaQuestions.pending, (state, action) => {
      state.loading = 'pending';
    });
  },
})

export { fetchTriviaQuestions };
export const { saveAnswer } = questionsSlice.actions;
export default questionsSlice.reducer;
