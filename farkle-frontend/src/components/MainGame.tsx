import React, { useState } from 'react'
import NumberList from './NumberListProps'

const MainGame = () => {
    const [numberCount, setNumberCount] = useState(6);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);



    return (
        <div className="gameContainer">
            {/* <NumberList n={numberCount} onNumberClick={handleNumberClick} selectedIndex={selectedIndex} /> */}
            {/* <button onClick={handleGenerateClick}>Újra dobás</button> */}
            {/* <button onClick={handleGenerateClick}>Kész</button> */}
        </div>
    )
}

export default MainGame