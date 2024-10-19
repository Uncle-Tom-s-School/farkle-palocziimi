import React, { useContext } from 'react'
import { usePoints } from './PointsContext'

export type ScoreBoardData = {
  name:string,
  isPlayer1:boolean
}

const ScoreBoard : React.FC<ScoreBoardData> = ({name, isPlayer1}) => {
  //p1Selected, p2Selected, p1Round, p2Round, p1Total, p2Total
  const { points, setPoints } = usePoints();

  return (
    <div className='sbContainer'>
      <h3>{name}</h3>
      <div className='hr'></div>
      <div>
        <p>total/5000</p>
        <h5>{points[isPlayer1 ? 4 : 5]}</h5>
      </div>
      <div>
        <p>round</p>
        <h5>{points[isPlayer1 ? 2 : 3]}</h5>
      </div>
      <div>
        <p>selected</p>
        <h5>{points[isPlayer1 ? 0 : 1]}</h5>
      </div>
    </div>
  )
}

export default ScoreBoard