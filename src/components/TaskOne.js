import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'
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
    console.log(highestPopulationVehicle)
    const table = highestPopulationVehicle ? <TaskOneTable /> : null
    return <div>

        {!isLoading ? table : 'loading...........'}
        planets [Tatooine, Alderaan, Naboo, Bespin, Endor].
    </div>;
};

export default TaskOne;
