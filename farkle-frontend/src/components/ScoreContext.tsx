// src/ScoreContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Score {
  player: number;
  computer: number;
}

interface ScoreContextType {
  scores: Score;
  rounds: number;
  updateScores: (playerPoints: number, computerPoints: number) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [scores, setScores] = useState<Score>({ player: 0, computer: 0 });
  const [rounds, setRounds] = useState(0);

  const updateScores = (playerPoints: number, computerPoints: number) => {
    setScores((prevScores) => ({
      player: prevScores.player + playerPoints,
      computer: prevScores.computer + computerPoints,
    }));
    setRounds((prevRounds) => prevRounds + 1);
  };

  return (
    <ScoreContext.Provider value={{ scores, rounds, updateScores }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error('useScore must be used within a ScoreProvider');
  }
  return context;
};
