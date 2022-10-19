import { useSelector } from 'react-redux'
import { RootState } from '../../../lib/store';
import { Header } from '../../components/Header';
import TriviaFinished from './components/TriviaFinished';
import TriviaInProgress from './components/TriviaInProgress';
import TriviaSettings from './components/TriviaSettings';

const TriviaPage: React.FC = () => {
  const gameState = useSelector((state: RootState) => state.game);

  return (
    <div>
      <Header title="Trivia" />
      {gameState.isGameInProgress && (
        <TriviaInProgress />
      )}
      {gameState.isGameFinished && (
        <TriviaFinished />
      )}
      {!gameState.isGameInProgress &&
        !gameState.isGameFinished && (
        <TriviaSettings />
      )}
    </div>
  )
}

export default TriviaPage;
