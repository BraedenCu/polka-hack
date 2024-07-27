// src/components/ChimpTest.js
import React, { useState, useEffect } from 'react';

const ChimpTest = ({ onGameEnd }) => {
  const [grid, setGrid] = useState([]);
  const [isShowing, setIsShowing] = useState(true);
  const [clicked, setClicked] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateGrid();
  }, []);

  const generateGrid = () => {
    const newGrid = Array.from({ length: score + 3 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
    setGrid(newGrid);
    setClicked([]);
    setIsCorrect(null);
    setIsShowing(true);
    setTimeout(() => {
      setIsShowing(false);
    }, 3000); // display grid for 3 seconds
  };

  const handleClick = (num) => {
    const newClicked = [...clicked, num];
    setClicked(newClicked);
    if (newClicked.length === grid.length) {
      if (newClicked.join('') === grid.sort((a, b) => a - b).join('')) {
        setIsCorrect(true);
        setScore(score + 1);
        setTimeout(generateGrid, 1000);
      } else {
        setIsCorrect(false);
        onGameEnd(score);
      }
    }
  };

  return (
    <div>
      <h2>Chimp Test</h2>
      <p>Score: {score}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {grid.map((num, index) => (
          <div
            key={index}
            style={{
              width: '50px',
              height: '50px',
              background: isShowing ? 'gray' : 'lightgray',
              textAlign: 'center',
              lineHeight: '50px',
              cursor: 'pointer'
            }}
            onClick={() => !isShowing && handleClick(num)}
          >
            {isShowing ? num : clicked.includes(num) ? num : ''}
          </div>
        ))}
      </div>
      {isCorrect !== null && (isCorrect ? <p>Correct!</p> : <p>Incorrect!</p>)}
      <button onClick={generateGrid}>Next</button>
    </div>
  );
};

export default ChimpTest;