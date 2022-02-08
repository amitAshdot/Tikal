import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'
import Loading from './Loading';
import TaskOneTable from './TaskOneTable';
const TaskOne = () => {
    const vehicleContext = useContext(VehicleContext);
    const { isLoading, getAndInitData, calculatePopulationToVehicle, planetsMap, highestPopulationVehicle, pilotsMap } = vehicleContext;


    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            getAndInitData()
        } else {
            calculatePopulationToVehicle()
        }
    }, [planetsMap]);
    const table = highestPopulationVehicle ? <TaskOneTable /> : null
    return <div className='taskOne'>
        <h1 className='taskOne-title'>Did you know?</h1>
        {!isLoading ? table : <Loading />}
        {/* <Loading /> */}
    </div>;
};

export default TaskOne;
