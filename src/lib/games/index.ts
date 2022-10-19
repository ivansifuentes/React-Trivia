import TriviaPage from "../../ui/games/trivia/TriviaPage";
import { GameTypes } from "../constants";

export const getGameByType = (gameType: string) => {
  let gameClass;
  switch (gameType) {
    case GameTypes.TRIVIA: {
      gameClass = TriviaPage;
      break;
    }
  }
  return gameClass;
}