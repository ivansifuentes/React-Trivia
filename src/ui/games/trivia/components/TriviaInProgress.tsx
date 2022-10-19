import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components';
import { AppDispatch, RootState } from '../../../../lib/store';
import { endGame } from '../../../../lib/store/gameSlice';

import { saveAnswer } from '../../../../lib/store/loadQuestions';
import { decodeEntities, shuffle } from '../../../../lib/utils';

const TriviaInProgress: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const questions = useSelector((state: RootState) => state.questions.questions);
  const loading = useSelector((state: RootState) => state.questions.loading);
  const handleClickAnswer = (idx: number, value: string) => {
    dispatch(saveAnswer({ idx, value }));
    if (idx === questions.length - 1) {
      dispatch(endGame());
    }
  };

  const nextQuestionIdx = questions.findIndex((q) => !q.userAnswer);
  const nextQuestion = questions[nextQuestionIdx];
  // are we finished with all the questions?
  if (loading === 'pending') {
    return (<>Loading...</>);
  }
  if (!nextQuestion) {
    return (<>Something went wrong</>);
  }
  console.log(questions);
  // Mix up all the questions, correct & incorrect
  const allPossibleAnswers = [...nextQuestion?.incorrect_answers, nextQuestion.correct_answer ];
  const shuffledAnswers = shuffle(allPossibleAnswers);
  
  return (
    <CardContainer>
      <CardHeader>
        {nextQuestion.category}
      </CardHeader>
      <CardBody>
        {decodeEntities(nextQuestion.question)}
      </CardBody>
      <CardAnswersContainer>
        {shuffledAnswers.map((answer) => 
          <CardAnswer
            key={answer}
            onClick={() => handleClickAnswer(nextQuestionIdx, answer)}
          >
            {decodeEntities(answer)}
          </CardAnswer>
        )}
      </CardAnswersContainer>
    </CardContainer>
  )
}

const CardContainer = styled.div``;
const CardHeader = styled.div``;
const CardBody = styled.div``;
const CardAnswersContainer = styled.div`
  padding: 0 18px;
`;
const CardAnswer = styled.div``;

export default TriviaInProgress;
