import React, { useContext, useEffect, useState } from 'react'
import NumberList, { NumberListProp } from './NumberListProps'
import { ScoreBoardData } from './ScoreBoard';
import { PointsContext, usePoints } from './PointsContext';

interface PlayersData {
    players: ScoreBoardData[]
}

const MainGame: React.FC<PlayersData> = ({ players }) => {
    const [Dices, setDices] = useState<number[]>(Array(6).fill(2))
    const [SelectedIndexes, setSelectedIndexes] = useState<number[]>([]);
    const [LockedIndexes, setLockedIndexes] = useState<number[]>([]);
    const [IsPlayer1Round, setIsPlayer1Round] = useState<boolean>(true)
    //p1Selected, p2Selected, p1Round, p2Round, p1Total, p2Total
    const { points, setPoints } = usePoints();


    const props: NumberListProp = {
        numberList: Dices,
        selectedIndexList: SelectedIndexes,
        lockedIndexes: LockedIndexes,
        setSelectedIndexList: setSelectedIndexes
    }

    const setIndexPoints = (num: number, index: number) => {
        setPoints([...(points.slice(0, index)), num, ...(points.slice(index + 1))])
    }

    const regenerateList = (isNextRound: boolean) => {
        const list: number[] = Array(6).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
        if (!isNextRound) {
            setLockedIndexes([...LockedIndexes, ...SelectedIndexes].sort())
            setSelectedIndexes([])
            list.forEach((x, i) => {
                list[i] = SelectedIndexes.includes(i) || LockedIndexes.includes(i) ? Dices[i] : x
            })
            setIndexPoints(0, IsPlayer1Round ? 0 : 1)

            if (calculatePoints(list.filter((_, index) => ![...LockedIndexes, ...SelectedIndexes].includes(index))) == 0) {
                nextRound(true)
            }
        }
        setDices(list)
    }

    useEffect(() => {
        //Set Selected Points
        setIndexPoints(calculatePoints(Dices.filter((_, i) => SelectedIndexes.includes(i))), IsPlayer1Round ? 0 : 1)

    }, [SelectedIndexes])

    useEffect(() => {
        //Set Round Points
        setIndexPoints(calculatePoints(Dices.filter((_, i) => LockedIndexes.includes(i))), IsPlayer1Round ? 2 : 3)
    }, [LockedIndexes])


    const nextRound = (withZero: boolean) => {
        if (withZero) {
            alert(`Sajnos az új kockák értéke 0, ebben a körben nem kaptál semmit, ${players[IsPlayer1Round ? 0 : 1].name} :(`)
            setIsPlayer1Round(!IsPlayer1Round)
            setLockedIndexes([])
            setSelectedIndexes([])
            setPoints([0,0,0,0,...points.slice(4)])
            regenerateList(true)
            return
        }
        // setIndexPoints(points[IsPlayer1Round ? 4 : 5] + calculatePoints(Dices), IsPlayer1Round ? 4 : 5)
        // setIndexPoints(0, IsPlayer1Round ? 0 : 1)
        // setIndexPoints(0, IsPlayer1Round ? 2 : 3)
        setPoints([
            IsPlayer1Round ? 0 : points[0],
            IsPlayer1Round ? points[1] : 0,
            IsPlayer1Round ? 0 : points[2],
            IsPlayer1Round ? points[3] : 0,
            IsPlayer1Round ? points[4] + calculatePoints(Dices) : points[4],
            IsPlayer1Round ? points[5] : points[5] + calculatePoints(Dices),
        ])

        setLockedIndexes([])
        setSelectedIndexes([])
        
        if (points[IsPlayer1Round ? 4 : 5] + calculatePoints(Dices) >= 5000) {
            alert("Játék vége!\r\n" + 
                players[IsPlayer1Round ? 0 : 1].name + 
                " nyert " + 
                (points[IsPlayer1Round ? 4 : 5] + 
                calculatePoints(Dices)) + 
                " ponttal.")
            setPoints(Array(6).fill(0))
        }
        setIsPlayer1Round(!IsPlayer1Round)
        regenerateList(true)
    }

    //Calculate: 2^(n-3) * k * 100

    const calculatePoints = (dicesList: number[]): number => {
        const counts: number[] = Array(6).fill(0)
        dicesList.forEach((num) => counts[num - 1]++)

        if (JSON.stringify(dicesList) == JSON.stringify([1, 2, 3, 4, 5, 6])) {
            return 1500
        }

        counts.forEach((num, i) => counts[i] = [1, 5].includes(i + 1) || num >= 3 ? num : 0)

        let points: number = 0
        counts.forEach((num, i) => {
            if (num < 3) {
                points += (i + 1) == 1 ? num * 100 : num * 50
            } else {
                if ((i + 1) == 1 && num == 3) {
                    points += 1000
                } else {
                    points += Math.pow(2, num - 3) * (i + 1) * 100
                }
            }
        })
        return points
    }


    useEffect(() => {
        regenerateList(true)
    }, [])


    return (
        <div className="gameContainer">
            <h3>Játszik: {players[IsPlayer1Round ? 0 : 1].name}</h3>
            <NumberList {...props} />
            <button disabled={[0, 6].includes(SelectedIndexes.length)} onClick={() => regenerateList(false)}>Újra dobás</button>
            <button onClick={() => nextRound(false)}>Kész</button>
        </div>
    )
}

export default MainGame