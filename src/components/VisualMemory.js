// src/components/VisualMemory.js
import React, { useState, useEffect } from 'react';

const VisualMemory = ({ onGameEnd }) => {
  const [pattern, setPattern] = useState([]);
  const [inputPattern, setInputPattern] = useState([]);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generatePattern();
  }, []);

  const generatePattern = () => {
    const newPattern = Array.from({ length: score + 3 }, () => Math.random() > 0.5);
    setPattern(newPattern);
    setInputPattern(new Array(score + 3).fill(false));
    setIsCorrect(null);
    setTimeout(() => {
      setPattern(new Array(score + 3).fill(false));
    }, 3000); // display pattern for 3 seconds
  };

  const handleClick = (index) => {
    const newInputPattern = [...inputPattern];
    newInputPattern[index] = !newInputPattern[index];
    setInputPattern(newInputPattern);
    if (newInputPattern.join('') === pattern.join('')) {
      setIsCorrect(true);
      setScore(score + 1);
      setTimeout(generatePattern, 1000);
    }
  };

  const checkPattern = () => {
    if (inputPattern.join('') === pattern.join('')) {
      setIsCorrect(true);
      setScore(score + 1);
      setTimeout(generatePattern, 1000);
    } else {
      setIsCorrect(false);
      onGameEnd(score);
    }
  };

  return (
    <div>
      <h2>Visual Memory Test</h2>
      <p>Score: {score}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {pattern.map((isActive, index) => (
          <div
            key={index}
            style={{
              width: '50px',
              height: '50px',
              background: isActive ? 'gray' : (inputPattern[index] ? 'blue' : 'lightgray'),
              textAlign: 'center',
              lineHeight: '50px',
              cursor: 'pointer'
            }}
            onClick={() => handleClick(index)}
          >
            &nbsp;
          </div>
        ))}
      </div>
      {isCorrect !== null && (isCorrect ? <p>Correct!</p> : <p>Incorrect!</p>)}
      <button onClick={checkPattern}>Submit</button>
    </div>
  );
};

export default VisualMemory;