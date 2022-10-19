import { useDispatch } from 'react-redux'
import { Difficulty } from '../../../../lib/constants';
import { AppDispatch } from '../../../../lib/store';
import { setDifficulty, startGame } from '../../../../lib/store/gameSlice';
import { fetchTriviaQuestions } from '../../../../lib/store/loadQuestions';


const TriviaSettings: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const handleClickStart = (difficulty: Difficulty) => {
    dispatch(setDifficulty(difficulty));
    dispatch(fetchTriviaQuestions(difficulty))
    dispatch(startGame());
  };

  return (
    <div>
      <div onClick={() => handleClickStart(Difficulty.EASY)}>
        EASY GAME
      </div>
      <div onClick={() => handleClickStart(Difficulty.MEDIUM)}>
        MEDIUM GAME
      </div>
      <div onClick={() => handleClickStart(Difficulty.HARD)}>
        HARD GAME
      </div>
    </div>
  )
}

export default TriviaSettings;
