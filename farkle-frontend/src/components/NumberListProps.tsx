import React from 'react';

interface NumberListProps {
  n: number;
  onNumberClick: (index: number) => void;
  selectedIndex: number | null;
}

const NumberList: React.FC<NumberListProps> = ({ n, onNumberClick, selectedIndex }) => {
  const generateList = (length: number): number[] => {
    return Array.from({ length }, () => Math.floor(Math.random() * 6) + 1);
  };

  const numberList = generateList(n);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {numberList.map((number, index) => (
        <button
          key={index}
          onClick={() => onNumberClick(index)}
          style={{
            backgroundColor: selectedIndex === index ? 'lightgreen' : 'transparent',
            cursor: 'pointer',
            padding: '10px',
          }}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default NumberList;
