import React, { useContext, useEffect, useState, useRef } from 'react'
import VehicleContext from '../context/vehicle/vehicleContext'

const TaskOneTable = () => {
    const vehicleContext = useContext(VehicleContext);
    const { getVehicles, isLoading, getAndInitData, calculatePopulationToVehicle, sumMap, planetsMap } = vehicleContext;

    const getHighestPopulation = () => {
        let highest = ['1', { populationSum: 0 }] // [{vehicle id} , {planets poplation}]
        let iteratorArr = [...Array.from(sumMap)]
        iteratorArr.forEach(planet =>
            highest = planet[1].populationSum > highest[1].populationSum ? planet : highest
        )
        return sumMap.get(highest[0])
    }
    const test = sumMap ? getHighestPopulation() : null


    const getDetailsFromMapInObject = (keyName) => {
        let planetsArr = []
        for (const [key, value] of test[keyName]) {
            planetsArr = [...planetsArr, [value.name, value.population]]
        }
        return planetsArr
    }
    const planets = test ? getDetailsFromMapInObject('planets') : null
    const pilots = test ? getDetailsFromMapInObject('pilots') : null

    return <table>
        <thead>

            <tr>
                <th>Vehicle name with the largest sum {test.name}</th>
            </tr>
        </thead>
        <tbody>
            <tr ><td>Related home planets and their respective</td></tr>
            <tr>
                {planets.map((planetDetails, key) => { return <td key={key}> {planetDetails} </td> })}
            </tr>
            <tr><td>population</td></tr>

        </tbody>

        <tr>
            <th>Related pilot names</th>
            {pilots.map((pilotDetails, key) => { return <td key={key}> {pilotDetails} </td> })}
        </tr>
    </table>;
};

export default TaskOneTable;
