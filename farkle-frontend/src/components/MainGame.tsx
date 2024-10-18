import React, { useEffect, useState } from 'react'
import NumberList, { NumberListProp } from './NumberListProps'



const MainGame = () => {
    const [Dices, setDices] = useState<number[]>(Array(6).fill(2))
    const [SelectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [LockedIndexes, setLockedIndexes] = useState<number[]>([]);
    const [IsPlayerRound, setIsPlayerRound] = useState<boolean>(true)
    
    const props: NumberListProp = {
        numberList: Dices,
        selectedIndexList: SelectedIndexes,
        lockedIndexes: LockedIndexes,
        setSelectedIndexList: setSelectedIndexes
    }
    
    const regenerateList = (isNextRound:boolean) => {
        const list:number[] = Array(6).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
        if (!isNextRound) {
            setLockedIndexes([...LockedIndexes, ...SelectedIndexes].sort())
            setSelectedIndexes([])
            list.forEach((x, i) => {
                list[i] = SelectedIndexes.includes(i) || LockedIndexes.includes(i) ? Dices[i] : x
            })
        }
        setDices(list)
    }

    const nextRound = () => {
        setIsPlayerRound(!IsPlayerRound)
        setLockedIndexes([])
        setSelectedIndexes([])
        regenerateList(true)
    }


    useEffect(() => {
      regenerateList(true)
    }, [])
    

    return (
        <div className="gameContainer">
            <NumberList {...props} />
            <button onClick={() => regenerateList(false)}>Újra dobás</button>
            <button onClick={nextRound}>Kész</button>
        </div>
    )
}

export default MainGame