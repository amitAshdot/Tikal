import React, { useContext, useEffect, useState } from 'react'
import VehicleContext from '../context/app/appContext'
import TaskTwoCandle from './TaskTwoCandle';
const TaskTwoGraph = (props) => {
    const { isLog } = props
    const vehicleContext = useContext(VehicleContext);
    const { planetsNames, planetsList, setPlanetsList, filtteredPlanetsList } = vehicleContext;

    const [maxMin, setMaxMin] = useState({});
    const [relevant, setRelevant] = useState([]);

    const taskCandles = relevant.length > 0 ? relevant.map((planet, key) => <TaskTwoCandle maxMin={maxMin} planet={planet} key={key} isLog={isLog} />) : null
    useEffect(() => {
        const findMax = () => {
            let max = 0, min = Number.MAX_VALUE
            let planets = []

            if (filtteredPlanetsList) {
                planets.push(...filtteredPlanetsList.filter(planet => planet.name === planetsNames[planetsNames.indexOf(planet.name)]));
            }
            else
                planets.push(...planetsList.filter(planet => planet.name === planetsNames[planetsNames.indexOf(planet.name)]));

            planets.forEach(planet => {
                let planetPopulationInt = parseInt(planet.population)
                if (planetPopulationInt > max && !isNaN(planetPopulationInt))
                    max = planetPopulationInt
                if (planetPopulationInt < min && !isNaN(planetPopulationInt))
                    min = planetPopulationInt
            })

            if (isLog) {
                max = Math.log10(max)
                min = Math.log10(min)
            }
            setMaxMin({ max, min })
            setPlanetsList(planets)
            setRelevant(planets)
            return maxMin
        }
        findMax()
    }, [isLog]);


    return <div className='graph-container'>
        {maxMin && (<>{taskCandles}</>)}
    </div>;
};

export default TaskTwoGraph;
