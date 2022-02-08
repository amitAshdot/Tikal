import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'
import TaskTwoCandle from './TaskTwoCandle';
const TaskTwoGraph = () => {
    const vehicleContext = useContext(VehicleContext);
    const { pilotsMap, planetsNames, planetsList, setPlanetsList } = vehicleContext;

    const [maxMin, setMaxMin] = useState({});
    const [relevant, setRelevant] = useState([]);

    const findMax = () => {
        let max = 0, min = 999999999999999999999
        let planets = []
        planets.push(...planetsList.filter(planet => planet.name === planetsNames[planetsNames.indexOf(planet.name)]));
        planets.forEach(planet => {

            let planetPopulationInt = parseInt(planet.population)
            if (planetPopulationInt > max && !isNaN(planetPopulationInt))
                max = planetPopulationInt
            if (planetPopulationInt < min && !isNaN(planetPopulationInt))
                min = planetPopulationInt

        })
        max = Math.log10(max)
        min = Math.log10(min)
        setMaxMin({ max, min })
        setPlanetsList(planets)
        setRelevant(planets)
        return max
    }

    const taskCandles = relevant.length > 0 ? relevant.map((planet, key) => <TaskTwoCandle maxMin={maxMin} planet={planet} key={key} />) : null
    useEffect(() => {
        findMax()
    }, []);

    return <div className='graph-container'>

        {maxMin && (
            <>
                {taskCandles}
            </>
        )
        }
    </div>;
};

export default TaskTwoGraph;
