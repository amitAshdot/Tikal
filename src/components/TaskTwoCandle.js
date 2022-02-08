import React, { useEffect, useState } from 'react'

const TaskTwoCandle = (props) => {
    const { maxMin, planet, isLog } = props
    const [height, setHeight] = useState('100%');

    const calculateHight = () => {
        const { population } = planet;
        if (maxMin) {
            let realHight = null, numberSize = null
            let distance = maxMin.max - maxMin.min
            let minimumHight = maxMin.min - 1
            if (isLog) {
                numberSize = Math.log10(parseInt(population)) - minimumHight;
                realHight = (((numberSize / (maxMin.max - distance)) * 100) * 0.9 + '%');
            } else {
                numberSize = parseInt(population)
                realHight = (((numberSize / maxMin.max) * 100) * 0.9 + '%');
            }
            setHeight(realHight)
        }
    }

    useEffect(() => {
        calculateHight()
    }, [maxMin]);


    return <div className='graph-candle'>
        <div className='graph-candle-number'>{planet.population}</div>
        <div className='graph-candle-middle' style={{ height: height }}></div>
        <div className='graph-candle-text'>{planet.name}</div>
    </div>;
};

export default TaskTwoCandle;
