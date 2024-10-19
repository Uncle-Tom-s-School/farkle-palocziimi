// src/App.tsx
import React, { createContext, useState } from 'react';
import NumberList from './components/NumberListProps';
import './index.css'
import MainGame from './components/MainGame';
import ScoreBoard, { ScoreBoardData } from './components/ScoreBoard';
import { PointsProvider } from './components/PointsContext';

const App: React.FC = () => {

  const data1: ScoreBoardData = {
    name: "Péter",
    isPlayer1: true,
  }

  const data2: ScoreBoardData = {
    name: "Miklós",
    isPlayer1: false
  }

  return (

    <PointsProvider>
            <ScoreBoard {...data1}/>
            <MainGame players={[data1, data2]}/>
            <ScoreBoard {...data2}/>
    </PointsProvider>
  );
};

export default App;
