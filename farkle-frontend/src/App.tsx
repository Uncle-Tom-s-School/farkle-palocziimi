// src/App.tsx
import React, {useState} from 'react';
import NumberList from './components/NumberListProps';
import { ScoreProvider } from './components/ScoreContext';
import Scoreboard from './components/Scoreboard';
import ScoreUpdater from './components/ScoreUpdater';

const App: React.FC = () => {

  const [numberCount, setNumberCount] = useState(6);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleNumberClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleGenerateClick = () => {
    const remainingCount = numberCount - (selectedIndex !== null ? 1 : 0); // Maradék gombok száma
    setNumberCount(remainingCount > 0 ? remainingCount : 1); // Legalább 1 számot generáljon
    setSelectedIndex(null); // Választás visszaállítása
  };

  return (
    <ScoreProvider>
      <Scoreboard />
      <ScoreUpdater />
      <NumberList n={numberCount} onNumberClick={handleNumberClick} selectedIndex={selectedIndex} />
      <button onClick={handleGenerateClick}>Új számok generálása (maradék)</button>
    </ScoreProvider>
  );
};

export default App;
