import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'
import TaskTwoGraph from './TaskTwoGraph';
import Loading from './Loading';

const TaskTwo = () => {
    const vehicleContext = useContext(VehicleContext);
    const { pilotsMap, planetsNames, getPlanetsByNames, planetsList } = vehicleContext;

    useEffect(() => {
        getPlanetsByNames(planetsNames);
    }, []);

    return <div className='taskTwo'>
        <h1 className='taskTwo-title'>Task No.2 Graph</h1>
        <p>*An algoritmic (log10) chart </p>
        {planetsList.length ? <TaskTwoGraph /> : <Loading />
        }
    </div>;
};

export default TaskTwo;
