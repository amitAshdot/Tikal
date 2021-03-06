import React, { useContext } from 'react'
import VehicleContext from '../context/app/appContext'

const TaskOneTable = () => {
    const vehicleContext = useContext(VehicleContext);
    const { highestPopulationVehicle } = vehicleContext;
    const planetsListToShow = highestPopulationVehicle['planets'].map((planetDetails, key) => { return <p key={key}> {`[${planetDetails.name}, ${planetDetails.population}]`} </p> })
    const pilotsListToShow = highestPopulationVehicle['pilots'].map((pilotDetails, key) => { return <p key={key}> {pilotDetails.name} </p> })
    return <table>
        <thead>
            <tr>
                <th>Vehicle name with the largest sum {highestPopulationVehicle.name}</th>
            </tr>
        </thead>
        <tbody>
            <tr><th>Related home planets and their respective</th></tr>
            <tr>
                <td>{planetsListToShow}</td>
            </tr>
            <tr><th>Total population</th><td>{highestPopulationVehicle.totalHomePopulation}</td></tr>
        </tbody>
        <tfoot>
            <tr>
                <th>Related pilot names</th>
                <td>{pilotsListToShow}</td>
            </tr>
        </tfoot>
    </table>;
};

export default TaskOneTable;
