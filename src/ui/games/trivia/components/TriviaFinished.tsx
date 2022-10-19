import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { AppDispatch, RootState } from '../../../../lib/store';
import { restartGame } from '../../../../lib/store/gameSlice';
import { addGameResult } from '../../../../lib/store/gameSeriesSlice';

import { decodeEntities } from '../../../../lib/utils';
import { useNavigate } from 'react-router-dom';

const TriviaFinished: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector((state: RootState) => state.questions.questions);
  const loading = useSelector((state: RootState) => state.questions.loading);

  if (loading === 'pending') {
    return (<>Loading...</>);
  }
  console.log(questions);
  const correctAnswers = questions.filter((q) => q.userAnswer!.isCorrect);

  const handleClickContinue = () => {
    dispatch(addGameResult({
      correct: correctAnswers.length,
      incorrect: questions.length - correctAnswers.length
    }));
    dispatch(restartGame());
    navigate('/game-series');
  }

  return (
    <ResultsContainer>
      <ResultsHeader>
        Your score is: {correctAnswers.length}
      </ResultsHeader>
      <UserAnswersContainer>
        {questions.map((q, idx) => 
          <UserAnswer key={`ans-${idx}`}>
            <AnswerQuestion>
              {decodeEntities(q.question)}
            </AnswerQuestion>
            <AnswerIsCorrect>
              {q.userAnswer!.isCorrect
                ? <CorrectAnswer>{q.userAnswer!.value}</CorrectAnswer>
                : <WrongAnswer>{q.userAnswer!.value}</WrongAnswer>}
            </AnswerIsCorrect>
          </UserAnswer>
        )}
      </UserAnswersContainer>
      <Continue onClick={handleClickContinue}>
        Continue
      </Continue>
    </ResultsContainer>
  )
}

const ResultsContainer = styled.div``;
const ResultsHeader = styled.div``;
const UserAnswersContainer = styled.div`
  padding: 50px;
`;
const UserAnswer = styled.div`
  max-width: 350px;
  padding: 25px;
  margin: 20px 0;
  border-radius: 30px;
  border: solid;
`;
const AnswerQuestion = styled.div``;
const AnswerIsCorrect = styled.div``;
const CorrectAnswer = styled.div`
  background-color: green;
`;
const WrongAnswer = styled.div`
  background-color: red;
`;

const Continue = styled.div``;

export default TriviaFinished;
