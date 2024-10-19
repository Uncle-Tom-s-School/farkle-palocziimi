import React from 'react'
import '../index.css'

export type NumberListProp = {
  numberList:number[]
  selectedIndexList:number[]
  lockedIndexes: number[]
  setSelectedIndexList:React.Dispatch<React.SetStateAction<number[]>>
}

const NumberListProps: React.FC<NumberListProp> = ({numberList, selectedIndexList, lockedIndexes, setSelectedIndexList}) => {
  return (
    <div className='numberList'>
      {
        numberList.map((num, i) => (
          <button
          key={i}
          onClick={() => {
            const addedIndexList:number[] = selectedIndexList.includes(i) ? selectedIndexList.filter((x) => x != i) : [...selectedIndexList, i].sort()
            setSelectedIndexList(addedIndexList)
          }}
          className={`btnDice${selectedIndexList.includes(i) ? ' selected' : lockedIndexes.includes(i) ? ' locked' : ''}`}
          disabled={lockedIndexes.includes(i)}
        >
          {num}
        </button>
        ))
      }
    </div>
  )
}

export default NumberListProps
