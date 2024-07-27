// src/components/SequenceMemory.js
import React, { useState, useEffect } from 'react';
import './SequenceMemory.css';

const SequenceMemory = ({ onGameEnd }) => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [size, setSize] = useState(2);
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateSequence();
  }, [size]);

  const generateSequence = () => {
    const newSequence = Array.from({ length: size * size }, (_, index) => index).sort(() => Math.random() - 0.5);
    setSequence(newSequence);
    setUserSequence([]);
    setTimeout(() => {
      setSequence([]);
    }, 3000); // display sequence for 3 seconds
  };

  const handleUserInput = (index) => {
    const newUserSequence = [...userSequence, index];
    setUserSequence(newUserSequence);
    if (sequence[newUserSequence.length - 1] !== index) {
      onGameEnd(score);
    } else if (newUserSequence.length === sequence.length) {
      setScore(score + 1);
      setTimeout(() => setSize(size + 1), 1000); // Increase size after 1 second
    }
  };

  return (
    <div className="sequence-container">
      <h2>Sequence Memory Test</h2>
      <p>Score: {score}</p>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
        {Array.from({ length: size * size }).map((_, index) => (
          <div
            key={index}
            className="box"
            onClick={() => handleUserInput(index)}
          >
            {sequence.includes(index) ? index + 1 : ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequenceMemory;