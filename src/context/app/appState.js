import React, { useReducer } from 'react';
import axios from 'axios';
import vehicleContext from './appContext';
import vehicleReducer from './appReducer'
import { url } from '../../utils/api'
// import mockVehicleResults from '../../mockData/vehicles.json'
// import mockPeopleResults from '../../mockData/people.json'
// import mockPeopleResults from '../../mockData/people.json'
// import mockPlanetsResults from '../../mockData/planets.json'
// import taskTwoPlanets from '../../mockData/taskTwoPlanets.json'

import {
    SET_PILOTS,
    SET_PLANETS,
    SET_HIGHEST_POPULATION_VEHICLE,
    SET_PLANETS_LIST,
    FETCH_START,
    FETCH_FAILED,
    FETCH_PEOPLE_SUCCESS,
    FETCH_VEHICLES_SUCCESS,
    FETCH_PLANETS_SUCCESS,
} from '../type';

const ApppState = props => {
    const initialState = {
        isLoading: false,
        error: null,
        //-- task 1 --
        pilotsMap: null,
        planetsMap: null,
        highestPopulationVehicle: null,
        peopleList: null,
        //-- task2 --
        planetsNames: ['Tatooine', 'Alderaan', 'Naboo', 'Bespin', 'Endor'],
        planetsList: [],
        filtteredPlanetsList: null,
    };
    const [state, dispatch] = useReducer(vehicleReducer, initialState);

    ///--- FETCH ---
    const fetchStart = () => { dispatch({ type: FETCH_START }); };
    const fetchFailed = (error) => { dispatch({ type: FETCH_FAILED, payload: error }); };
    const fetchPeopleSuccess = (data) => { dispatch({ type: FETCH_PEOPLE_SUCCESS, payload: data }); };

    ///--- SETTERS ---
    const setPilotsByMap = (PilotMap) => { dispatch({ type: SET_PILOTS, payload: PilotMap }); }
    const setPlanetsByMap = (PlanetMap) => { dispatch({ type: SET_PLANETS, payload: PlanetMap }); }
    const setHighestPopulationVehicle = (vehicleObject) => { dispatch({ type: SET_HIGHEST_POPULATION_VEHICLE, payload: vehicleObject }); }
    const setPlanetsList = (planetList) => { dispatch({ type: SET_PLANETS_LIST, payload: planetList }); }

    ///--- GETTERS ---
    const getObjectFromURL = (url) => {
        let cleanUrl = url.slice(0, url.length - 1)//'x.com/13/' => 'x.com/13'
        let id = cleanUrl.slice(cleanUrl.lastIndexOf("/") + 1, cleanUrl.length)
        return { id: id, url: cleanUrl }
    }

    const getAllByCategoryAPI = async (category) => {
        const categories = { "people": "people", 'vehicle': 'vehicle', 'planets': 'planets' }
        let list = [], pageNum = 1
        try {
            fetchStart()
            while (pageNum) {
                const res = await axios.get(`${url}/${categories[category]}/?page=${pageNum}`);
                list = [...list, ...res.data.results]
                pageNum = res.data.next.slice(res.data.next.lastIndexOf('=') + 1, res.data.next.length)
            }
            fetchPeopleSuccess(list)
        } catch (err) {
            fetchFailed(err)
        }
        return list
    }

    const getVehiclesById = async (id) => {
        fetchStart()
        try {
            const res = await axios.get(`${url}/vehicles/${id}/`);
            dispatch({ type: FETCH_VEHICLES_SUCCESS, payload: res.data });
            return res.data
        } catch (err) {
            fetchFailed(err)
            return err
        }
    }

    const getPlanetsByMap = async (planetsMap) => {
        let keys = planetsMap.keys();
        let planetsList = [];

        fetchStart()
        try {
            for (let i = 0; i < planetsMap.size; i++) {
                const res = await axios.get(`${planetsMap.get(keys.next().value)}/`);
                planetsList = [...planetsList, res.data]
            }
            dispatch({ type: FETCH_PLANETS_SUCCESS, payload: planetsList });
        } catch (err) {
            fetchFailed(err)
        }
        return planetsList
    }

    const getPlanetsByNames = async (planetNames) => {
        fetchStart()
        try {
            const searchNames = planetNames.toString().replace(/,/g, "&")
            const res = await axios.get(`${url}/planets/?name=${searchNames}`);
            dispatch({ type: FETCH_PLANETS_SUCCESS, payload: res.data.results });
            return res.data.results
        } catch (err) {
            fetchFailed(err)
        }
    }

    const calculatePopulationToVehicle = async () => {
        let vehicleMap = new Map()
        let mostPoplationVehicle = { id: -1, totalHomePopulation: -1 }

        for (const [key, value] of state.pilotsMap) {
            const tempVehiclesArr = value.vehicles
            const piloteHomePlanetObject = state.planetsMap.get(getObjectFromURL(value.homeworld).id)
            tempVehiclesArr.forEach(vehicle => {
                const vehicleId = getObjectFromURL(vehicle).id;
                const knownPopulation = piloteHomePlanetObject.population === 'unknown' ? false : true
                if (!vehicleMap.get(vehicleId))
                    vehicleMap.set(vehicleId, {
                        id: vehicleId,
                        url: vehicle,
                        pilots: [value],
                        totalHomePopulation: knownPopulation ? parseFloat(piloteHomePlanetObject.population) : 0,
                        planets: [piloteHomePlanetObject]
                    })
                else {
                    const tempHomePopulation = knownPopulation ? vehicleMap.get(vehicleId).totalHomePopulation + parseFloat(piloteHomePlanetObject.population) : vehicleMap.get(vehicleId).totalHomePopulation
                    const pilots = [...vehicleMap.get(vehicleId).pilots, value]
                    const planets = [...vehicleMap.get(vehicleId).planets, piloteHomePlanetObject]
                    vehicleMap.set(vehicleId, {
                        id: vehicleId,
                        url: vehicle,
                        pilots: pilots,
                        totalHomePopulation: tempHomePopulation,
                        planets: planets
                    })
                }
            })
        }

        for (const [key, value] of vehicleMap) {
            if (value.totalHomePopulation > mostPoplationVehicle.totalHomePopulation)
                mostPoplationVehicle = { id: value.id, totalHomePopulation: value.totalHomePopulation }
        }
        let finaleVehicle = await getVehiclesById(mostPoplationVehicle.id)

        const vehicleId = getObjectFromURL(finaleVehicle.url).id;
        finaleVehicle.pilots = vehicleMap.get(vehicleId).pilots
        finaleVehicle.planets = vehicleMap.get(vehicleId).planets
        finaleVehicle.totalHomePopulation = vehicleMap.get(vehicleId).totalHomePopulation
        setHighestPopulationVehicle(finaleVehicle)

        return finaleVehicle
    }

    const getAndInitData = async () => {
        fetchStart()
        let planetsMap = new Map()
        let pilotMap = new Map()
        let peopleList = await getAllByCategoryAPI('people')

        for (let i = 0; i < peopleList.length; i++) {

            if (peopleList[i].vehicles.length > 0) {
                const copy = { ...peopleList[i], id: getObjectFromURL(peopleList[i].url).id };
                pilotMap.set(copy.id, copy)

                for (let j = 0; j < peopleList[i].vehicles.length; j++) {
                    let tempHomeWorldObject = getObjectFromURL(peopleList[i].homeworld)
                    if (!planetsMap.get(tempHomeWorldObject.id)) {
                        planetsMap.set(tempHomeWorldObject.id, tempHomeWorldObject.url);
                    }
                }
            }
        }
        let tempPlanetMap = await getPlanetsByMap(planetsMap)

        tempPlanetMap.forEach(planet => {
            const planetCopy = { ...planet, id: getObjectFromURL(planet.url).id };
            planetsMap.set(planetCopy.id, planetCopy)
        })

        setPilotsByMap(pilotMap)
        setPlanetsByMap(planetsMap)
    }
    return (
        <vehicleContext.Provider value={{
            isLoading: state.isLoading,
            error: state.error,
            pilotsMap: state.pilotsMap,
            planetsMap: state.planetsMap,
            highestPopulationVehicle: state.highestPopulationVehicle,
            planetsNames: state.planetsNames,
            planetsList: state.planetsList,
            filtteredPlanetsList: state.filtteredPlanetsList,
            calculatePopulationToVehicle,
            getAllByCategoryAPI,
            fetchStart,
            fetchFailed,
            getAndInitData,
            getPlanetsByNames,
            setPlanetsList,
        }} >

            {props.children}
        </vehicleContext.Provider>
    )
};
export default ApppState;