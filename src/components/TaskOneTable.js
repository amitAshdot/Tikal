import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'

const TaskOneTable = () => {
    const vehicleContext = useContext(VehicleContext);
    const { highestPopulationVehicle } = vehicleContext;
    const planetsListToShow = highestPopulationVehicle['planets'].map((planetDetails, key) => { return <td key={key}> {[planetDetails.name, planetDetails.population]} </td> })
    const pilotsListToShow = highestPopulationVehicle['pilots'].map((pilotDetails, key) => { return <td key={key}> {pilotDetails.name} </td> })
    return <table>
        <thead>

            <tr>
                <th>Vehicle name with the largest sum {highestPopulationVehicle.name}</th>
            </tr>
        </thead>
        <tbody>
            <tr ><td>Related home planets and their respective</td></tr>
            <tr>
                {planetsListToShow}
            </tr>
            <tr><td>population</td></tr>

        </tbody>

        <tr>
            <th>Related pilot names</th>
            {pilotsListToShow}
        </tr>
    </table>;
};

export default TaskOneTable;
