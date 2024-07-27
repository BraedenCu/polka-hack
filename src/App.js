// src/App.js
import React, { useState } from 'react';
import ReactionTime from './components/ReactionTime';
import SequenceMemory from './components/SequenceMemory';
import NumberMemory from './components/NumberMemory';
import ChimpTest from './components/ChimpTest';
import VisualMemory from './components/VisualMemory';
import './index.css';

const App = () => {
  const [currentGame, setCurrentGame] = useState(null);
  const [results, setResults] = useState([]);
  const [highScore, setHighScore] = useState({});

  const handleGameEnd = (game, result) => {
    if (result !== null) {
      setResults([...results, { game, result }]);
    }
    setHighScore({ ...highScore, [game]: Math.max(highScore[game] || 0, result) });
    setCurrentGame(null);
  };

  const games = {
    reactionTime: <ReactionTime onGameEnd={(result) => handleGameEnd('reactionTime', result)} />,
    sequenceMemory: <SequenceMemory onGameEnd={(result) => handleGameEnd('sequenceMemory', result)} />,
    numberMemory: <NumberMemory onGameEnd={(result) => handleGameEnd('numberMemory', result)} />,
    chimpTest: <ChimpTest onGameEnd={(result) => handleGameEnd('chimpTest', result)} />,
    visualMemory: <VisualMemory onGameEnd={(result) => handleGameEnd('visualMemory', result)} />
  };

  return (
    <div className="container">
      <h1>Human Benchmark Test</h1>
      {currentGame ? (
        games[currentGame]
      ) : (
        <div>
          <button onClick={() => setCurrentGame('reactionTime')}>Reaction Time</button>
          <button onClick={() => setCurrentGame('sequenceMemory')}>Sequence Memory</button>
          <button onClick={() => setCurrentGame('numberMemory')}>Number Memory</button>
          <button onClick={() => setCurrentGame('chimpTest')}>Chimp Test</button>
          <button onClick={() => setCurrentGame('visualMemory')}>Visual Memory</button>
          <h2>High Scores</h2>
          <ul>
            {Object.entries(highScore).map(([game, score]) => (
              <li key={game}>
                {game}: {score}
              </li>
            ))}
          </ul>
          <h2>Results</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>
                {result.game}: {result.result}
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentGame && <button onClick={() => setCurrentGame(null)}>Back to Menu</button>}
    </div>
  );
};

export default App;