import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'
import TaskTwoGraph from './TaskTwoGraph';

const TaskTwo = () => {
    const vehicleContext = useContext(VehicleContext);
    const { pilotsMap, planetsNames, getPlanetsByNames } = vehicleContext;

    useEffect(() => {
        // getPlanetsByNames(planetsNames);
    }, []);

    return <div className='taskTwo'>
        <h1 className='taskTwo-title'>Task No.2 Graph</h1>
        <TaskTwoGraph />
    </div>;
};

export default TaskTwo;
