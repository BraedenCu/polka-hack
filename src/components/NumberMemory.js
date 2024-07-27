// src/components/NumberMemory.js
import React, { useState, useEffect } from 'react';

const NumberMemory = ({ onGameEnd }) => {
  const [number, setNumber] = useState('');
  const [input, setInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateNumber();
  }, []);

  const generateNumber = () => {
    const newNumber = Math.floor(Math.random() * Math.pow(10, score + 1)).toString();
    setNumber(newNumber);
    setInput('');
    setIsCorrect(null);
    setTimeout(() => {
      setNumber('');
    }, 3000); // display number for 3 seconds
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const checkNumber = () => {
    if (input === number) {
      setIsCorrect(true);
      setScore(score + 1);
      generateNumber();
    } else {
      setIsCorrect(false);
      onGameEnd(score);
    }
  };

  return (
    <div>
      <h2>Number Memory Test</h2>
      <p>Score: {score}</p>
      <p>{number}</p>
      <input type="text" value={input} onChange={handleInputChange} />
      <button onClick={checkNumber}>Submit</button>
      {isCorrect !== null && (isCorrect ? <p>Correct!</p> : <p>Incorrect!</p>)}
    </div>
  );
};

export default NumberMemory;