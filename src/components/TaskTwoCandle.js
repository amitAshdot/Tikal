import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'
const TaskTwoCandle = (props) => {
    const { max, planet } = props
    const vehicleContext = useContext(VehicleContext);
    const { pilotsMap, planetsNames, planetsList } = vehicleContext;
    const [height, setHeight] = useState('100%');
    // const [numberOfsteps, setNumberOfsteps] = useState(0);
    // useEffe
    const calculateHight = () => {
        const { population } = planet;
        if (max) {
            debugger
            let numberSize = Math.log10(parseInt(population));
            let realHighet = (((numberSize / Math.log10(max)) * 100) * 0.9 + '%');
            setHeight(realHighet);
            // setHeight()
        }
    }

    useEffect(() => {
        calculateHight()
    }, []);


    return <div className='graph-candle'  >
        <div className='graph-candle-number'>{planet.population}</div>
        <div className='graph-candle-middle' style={{ height: height }}></div>
        <div className='graph-candle-text'>{planet.name}</div>
    </div>;
};

export default TaskTwoCandle;