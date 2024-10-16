// src/ScoreUpdater.tsx
import React, { useState } from 'react';
import { useScore } from './ScoreContext';

const ScoreUpdater: React.FC = () => {
  const { updateScores } = useScore();
  const [playerPoints, setPlayerPoints] = useState(0);
  const [computerPoints, setComputerPoints] = useState(0);

  const handleUpdate = () => {
    updateScores(playerPoints, computerPoints);
    setPlayerPoints(0); // Reset the input fields
    setComputerPoints(0);
  };

  return (
    <div>
      <h2>Pontok frissítése</h2>
      <div>
        <label>
          Felhasználó pontok:
          <input
            type="number"
            value={playerPoints}
            onChange={(e) => setPlayerPoints(Number(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Gép pontok:
          <input
            type="number"
            value={computerPoints}
            onChange={(e) => setComputerPoints(Number(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleUpdate}>Kör vége</button>
    </div>
  );
};

export default ScoreUpdater;
