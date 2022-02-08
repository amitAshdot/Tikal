import React, { useContext, useEffect, useState } from 'react'
import VehicleContext from '../context/app/appContext'
import TaskTwoGraph from './TaskTwoGraph';
import Loading from './Loading';
import Lightsaber from '../images/Lightsaber.png';
const TaskTwo = () => {
    const vehicleContext = useContext(VehicleContext);
    const { planetsNames, getPlanetsByNames, planetsList, filtteredPlanetsList } = vehicleContext;
    const [isLog, setIsLog] = useState(true);

    useEffect(() => {
        if (!filtteredPlanetsList)
            getPlanetsByNames(planetsNames);
    }, [isLog]);
    const toggleLog = () => { setIsLog(!isLog) }
    const chartText = isLog ? '*An algoritmic(log10) chart' : '*A linear chart';
    const buttonText = isLog ? 'Click here to switch to Classic(Linear) graph' : 'Click here to switch to Log graph'

    return <div className='taskTwo'>
        <h1 className='taskTwo-title'>Task No.2 Graph</h1>
        <button onClick={toggleLog}>
            {buttonText}
        </button>
        <h3 className='taskTwo-title'>Population size</h3>
        <p> {chartText}</p>
        {planetsList.length ? <TaskTwoGraph isLog={isLog} /> : null}
        {planetsList.length ? <Loading extraClass={'finish'} /> : <Loading extraClass={''} />}

        {/* {planetsList.length ? <TaskTwoGraph isLog={false} /> : <Loading />} */}
    </div>;
};

export default TaskTwo;
