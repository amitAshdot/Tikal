import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'
import TaskTwoCandle from './TaskTwoCandle';
const TaskTwoGraph = () => {
    const vehicleContext = useContext(VehicleContext);
    const { pilotsMap, planetsNames, planetsList, setPlanetsList } = vehicleContext;

    const [height, setHeight] = useState(0);
    const [relevant, setRelevant] = useState([]);

    const findMax = () => {
        let max = 0
        let planets = []
        planets.push(...planetsList.filter(planet => planet.name === planetsNames[planetsNames.indexOf(planet.name)]));
        planets.forEach(planet => {

            let planetPopulationInt = parseInt(planet.population)
            if (planetPopulationInt > max && !isNaN(planetPopulationInt))
                max = planetPopulationInt
        })
        setHeight(max)
        setPlanetsList(planets)
        setRelevant(planets)
        return max
    }

    const taskCandles = relevant.length > 0 ? relevant.map((planet, key) => <TaskTwoCandle max={height} planet={planet} key={key} />) : null
    useEffect(() => {
        findMax()
    }, []);

    return <div className='graph-container'>

        {height && (
            <>
                {taskCandles}
            </>
        )
        }
    </div>;
};

export default TaskTwoGraph;
