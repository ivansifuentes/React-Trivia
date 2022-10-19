import React from 'react';

import './App.css';

import { Routes, Route, useParams } from "react-router-dom";
import { getGameByType } from './lib/games';
import SelectGamePage from './ui/SelectGamePage';
import GameSeriesPage from './ui/games/GameSeriesPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<SelectGamePage />} />
          <Route path="/game-series" element={<GameSeriesPage />} />
          <Route path="/:gameType" element={<Game />} />
        </Routes>
      </header>
    </div>
  );
}

function Game() {
  let { gameType } = useParams();

  if (!gameType) {
    throw new Error('Missing game type');
  }

  const GamePage = getGameByType(gameType);
  if (!GamePage) {
    throw new Error('Invalid game type');
  }
  return (<GamePage />);
}

export default App;
