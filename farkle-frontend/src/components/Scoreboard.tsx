import React from 'react';
import { useScore } from './ScoreContext';

const Scoreboard: React.FC = () => {
  const { scores, rounds } = useScore();

  return (
    <div>
      <h1>Játékpontszámok</h1>
      <h2>Körök száma: {rounds}</h2>
      <div>
        <h3>Felhasználó</h3>
        <p>Pontok: {scores.player}</p>
      </div>
      <div>
        <h3>Gép</h3>
        <p>Pontok: {scores.computer}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
