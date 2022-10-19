import { Link } from "react-router-dom";
import { GameTypes } from "../lib/constants";
import { Counter } from "./components/Counter";
import { Header } from "./components/Header";

const SelectGamePage: React.FC = () => {
  const availableGameTypes = Object.values(GameTypes);
  return(
    <>
      <Header title="Game Selection" />
      <Counter />
      <div>
        {availableGameTypes.map((gameType) =>
          <Link to={gameType}>{gameType}</Link>
        )}          
      </div>
    </>
  );
}

export default SelectGamePage;
