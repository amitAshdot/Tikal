import React, { useReducer } from 'react';
import axios from 'axios';
import vehicleContext from './vehicleContext';
import vehicleReducer from './vehicleReducer'
import { url } from '../../utils/api'
import mockVehicleResults from '../../mockData/vehicles.json'
import mockPeopleResults from '../../mockData/people.json'
// import mockPeopleResults from '../../mockData/people.json'
import mockPlanetsResults from '../../mockData/planets.json'

import {
    SET_PILOTS,
    SET_PLANETS,
    SET_SUM_MAP,
    FETCH_START,
    FETCH_FAILED,
    FETCH_PILOTS_SUCCESS,
    FETCH_VEHICLES_SUCCESS,
    FETCH_PLANETS_SUCCESS,
} from '../type';

const VehicleState = props => {
    const initialState = {
        isLoading: false,
        error: null,
        //task 1
        // peopleList: [],
        // pilotsList: [],
        // vehicleList: [],
        // planetsList: [],
        peopleList: mockPeopleResults,
        pilotsList: [],
        vehicleList: mockVehicleResults,
        planetsList: mockPlanetsResults,
        pilotsMap: null,
        planetsMap: null,
        sumMap: null,

        //task2
        planetsNames: ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor']
    };
    const [state, dispatch] = useReducer(vehicleReducer, initialState);

    ///--- FETCH ---
    const fetchStart = () => {
        dispatch({ type: FETCH_START });

    };
    const fetchFailed = (error) => {
        dispatch({ type: FETCH_FAILED, payload: error });
    };

    ///--- SETTERS ---
    const setPilotsByMap = (PilotMap) => {
        dispatch({ type: SET_PILOTS, payload: PilotMap });
    }

    const setPlanetsByMap = (PlanetMap) => {
        dispatch({ type: SET_PLANETS, payload: PlanetMap });
    }
    const setSumMap = (sumMap) => {
        dispatch({ type: SET_SUM_MAP, payload: sumMap });
    }

    ///--- GETTERS ---
    const getObjectFromURL = (url) => {
        let cleanUrl = url.slice(0, url.length - 1)//'x.com/13/' => 'x.com/13'
        let id = cleanUrl.slice(cleanUrl.lastIndexOf("/") + 1, cleanUrl.length)
        return { id: id, url: cleanUrl }
    }

    const getPilotById = (id) => {
        return state.pilotsMap.get(id)
    }

    const getPlanetById = (id) => {
        return state.planetsMap.get(id)
    }

    const getAllByCategoryAPI = async (category) => {
        let list = [], status = 200, pageNum = 1
        fetchStart()
        try {
            while (status === 200) {
                const res = await axios.get(`${url}/${category}/?page=${pageNum}`);
                status = res.status
                pageNum++
                list = [...list, ...res.data.results]
            }
            // fetchSuccess(peopleList)
        } catch (err) {
            debugger
            if (list.length > 0 && status === 404)
                console.log(list)
            // fetchSuccess(vehicleList)
            else
                fetchFailed(err)
        }
        return list
    }

    const getVehiclesById = async (vehicleMap) => {
        let keys = vehicleMap.keys();
        let vehiclesList = [];

        fetchStart()
        try {
            for (let i = 0; i < vehicleMap.size; i++) {
                let iterator = keys.next()
                const res = await axios.get(vehicleMap.get(iterator.value));
                vehiclesList = [...vehiclesList, res.data]
            }
            console.log('vehiclesList: ', vehiclesList)
            dispatch({ type: FETCH_VEHICLES_SUCCESS, payload: vehiclesList });
        } catch (err) {
            fetchFailed(err)
        }
        return vehiclesList
    }

    const getPlanetsById = async (planetsMap) => {
        let keys = planetsMap.keys();
        let planetsList = [];

        fetchStart()
        try {
            for (let i = 0; i < planetsMap.size; i++) {
                const res = await axios.get(planetsMap.get(keys.next().value));
                planetsList = [...planetsList, res.data]
            }
            console.log('planetsList: ', planetsList)
            dispatch({ type: FETCH_PLANETS_SUCCESS, payload: planetsList });
        } catch (err) {
            fetchFailed(err)
        }
        return planetsList
    }

    const getPlanetsByName = async (planetName) => {
        fetchStart()
        try {
            const res = await axios.get(`${url}/planets/??search=${planetName}`);
            dispatch({ type: FETCH_PLANETS_SUCCESS, payload: res.data });
            return res.data
        } catch (err) {
            fetchFailed(err)
        }
    }

    // const getPlanetsByNames = async (planetsNames) => {
    //     let keys = planetsMap.keys();
    //     let planetsList = [];

    //     fetchStart()
    //     try {
    //         for (let i = 0; i < planetsMap.size; i++) {
    //             const res = await axios.get(planetsMap.get(keys.next().value));
    //             planetsList = [...planetsList, res.data]
    //         }
    //         console.log('planetsList: ', planetsList)
    //         dispatch({ type: FETCH_PLANETS_SUCCESS, payload: planetsList });
    //     } catch (err) {
    //         fetchFailed(err)
    //     }
    //     return planetsList
    // }

    const calculatePopulationToVehicle = () => {

        //CALCULATE SUM OF POPULATION BY VEHICLE -> PILOTS -> +PLANET POPULATION 
        let sumMap = new Map()

        for (let i = 0; i < state.vehicleList.length; i++) {
            let tempObject = {
                id: 0,
                name: '',
                pilots: new Map(),
                pilotsId: [],
                planets: new Map(),
                planetsId: [],
                populationSum: 0,
                url: ''
            }
            tempObject.id = getObjectFromURL(state.vehicleList[i].url).id
            tempObject.url = state.vehicleList[i].url
            tempObject.name = state.vehicleList[i].name
            let pilotsUrl = state.vehicleList[i].pilots

            pilotsUrl.forEach((pilot) => {
                let pilotUrlAndIdObject = getObjectFromURL(pilot);
                let pilotObject = getPilotById(pilotUrlAndIdObject.id)
                let homeworldIdAndUrl = getObjectFromURL(pilotObject.homeworld);
                let tempPlanet = getPlanetById(getObjectFromURL(pilotObject.homeworld).id)

                if (state.pilotsMap.get(pilotUrlAndIdObject.id)) {
                    if (!tempObject.pilots.get(pilotUrlAndIdObject.id)) {//if not in pilots hash Map temp object
                        tempObject.pilotsId = [...tempObject.pilotsId, pilotUrlAndIdObject.id]
                        tempObject.pilots.set(pilotUrlAndIdObject.id, state.pilotsMap.get(pilotUrlAndIdObject.id))
                    }
                }

                // homeworld
                if (tempPlanet) {
                    tempObject.populationSum += tempPlanet.population !== 'unknown' ? parseFloat(tempPlanet.population) : 0
                    if (!tempObject.planets.get(homeworldIdAndUrl.id)) {//if not in pilots hash Map temp object
                        tempObject.planetsId = [...tempObject.planetsId, homeworldIdAndUrl.id]
                        tempObject.planets.set(homeworldIdAndUrl.id, state.planetsMap.get(homeworldIdAndUrl.id))
                    }
                }
                sumMap.set(getObjectFromURL(tempObject.url).id, tempObject)
            })
        }

        setSumMap(sumMap)
        return sumMap
    }

    const getAndInitData = async () => {
        let planetsMap = new Map()
        let vehicleMap = new Map()
        let pilotMap = new Map()

        // let peopleList = await getAllByCategoryAPI('people')
        let peopleList = mockPeopleResults

        for (let i = 0; i < peopleList.length; i++) {

            if (peopleList[i].vehicles.length > 0) {
                const copy = { ...peopleList[i], id: getObjectFromURL(peopleList[i].url).id };
                pilotMap.set(copy.id, copy)

                for (let j = 0; j < peopleList[i].vehicles.length; j++) {
                    let tempVehicleObject = getObjectFromURL(peopleList[i].vehicles[j])
                    if (!vehicleMap.get(tempVehicleObject.id)) {
                        vehicleMap.set(tempVehicleObject.id, tempVehicleObject.url);
                    }

                    let tempHomeWorldObject = getObjectFromURL(peopleList[i].homeworld)
                    if (!planetsMap.get(tempHomeWorldObject.id)) {
                        // const planetCopy = { ...planetsList[i], id: getObjectFromURL(peopleList[i].homeworld).id };
                        // planetsMap.set(planetCopy.id, planetCopy)
                        planetsMap.set(tempHomeWorldObject.id, tempHomeWorldObject.url);
                    }
                }
            }
        }
        // let tempPlanetMap = await getPlanetsById(planetsMap)
        let tempPlanetMap = state.planetsList
        tempPlanetMap.forEach(planet => {
            const planetCopy = { ...planet, id: getObjectFromURL(planet.url).id };
            planetsMap.set(planetCopy.id, planetCopy)
        })

        // await getVehiclesById(vehicleMap)

        setPilotsByMap(pilotMap)
        setPlanetsByMap(planetsMap)
    }
    return (
        <vehicleContext.Provider value={{
            isLoading: state.isLoading,
            peopleList: state.peopleList,
            pilotsList: state.pilotsList,
            vehicleList: state.vehicleList,
            planetsList: state.planetsList,
            error: state.error,
            pilotsMap: state.pilotsMap,
            planetsMap: state.planetsMap,
            sumMap: state.sumMap,
            calculatePopulationToVehicle,
            getAllByCategoryAPI,
            fetchStart,
            fetchFailed,
            getAndInitData,
        }} >

            {props.children}
        </vehicleContext.Provider>
    )
};
export default VehicleState;