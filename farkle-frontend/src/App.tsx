// src/App.tsx
import React, { useState } from 'react';
import NumberList from './components/NumberListProps';
import './index.css'
import MainGame from './components/MainGame';
import ScoreBoard from './components/ScoreBoard';

const App: React.FC = () => {



  return (
    <>
      <ScoreBoard />
      <MainGame />
      <ScoreBoard />
    </>
  );
};

export default App;
