import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'
import TaskOneTable from './TaskOneTable';
const Testa = () => {
    const vehicleContext = useContext(VehicleContext);
    const { getVehicles, isLoading, getAndInitData, calculatePopulationToVehicle, sumMap, planetsMap } = vehicleContext;


    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            getAndInitData()
        } else {
            calculatePopulationToVehicle()
        }
    }, [planetsMap]);


    const table = sumMap ? <TaskOneTable /> : null
    return <div>

        {!isLoading ? table : 'loading...........'}
        planets [Tatooine, Alderaan, Naboo, Bespin, Endor].
    </div>;
};

export default Testa;
