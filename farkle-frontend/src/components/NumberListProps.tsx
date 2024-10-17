import React from 'react'

type NumberListProp = {
  numberList:number[]
  selectedIndexList:number[]
  onClick: (index: number) => void
}

const NumberListProps: React.FC<NumberListProp> = ({numberList, selectedIndexList, onClick}) => {
  return (
    <div className='numberList'>
      {
        numberList.map((num, i, a) => (
          <button
          key={i}
          onClick={() => onClick(i)}
          style={{
            backgroundColor: selectedIndexList.includes(i) ? 'lightgreen' : 'transparent',
            cursor: 'pointer',
            padding: '10px',
          }}
        >
          {num}
        </button>
        ))
      }
    </div>
  )
}

export default NumberListProps
