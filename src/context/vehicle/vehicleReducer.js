import {
    SET_PILOTS,
    SET_PLANETS,
    SET_SUM_MAP,
    SET_HIGHEST_POPULATION_VEHICLE,
    SET_PLANETS_LIST,
    FETCH_START,
    FETCH_FAILED,
    FETCH_SUCCESS,
    FETCH_PILOTS_SUCCESS,
    FETCH_VEHICLES_SUCCESS,
    FETCH_PLANETS_SUCCESS,
} from '../type';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
    switch (action.type) {
        case FETCH_START:
            return {
                ...state,
                isLoading: true
            }

        case FETCH_FAILED:
            return {
                ...state,
                error: action.payload,
                isLoading: false
            }
        case FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false
            }

        case FETCH_PILOTS_SUCCESS:
            return {
                ...state,
                pilotsList: action.payload,
                isLoading: false
            }
        case FETCH_VEHICLES_SUCCESS:
            return {
                ...state,
                vehicleList: action.payload,
                isLoading: false
            }

        case FETCH_PLANETS_SUCCESS:
            return {
                ...state,
                planetsList: action.payload,
                isLoading: false
            }

        case SET_PILOTS:
            return {
                ...state,
                pilotsMap: action.payload,
            }

        case SET_HIGHEST_POPULATION_VEHICLE:
            return {
                ...state,
                highestPopulationVehicle: action.payload,
            }

        case SET_PLANETS:
            return {
                ...state,
                planetsMap: action.payload,
            }
        case SET_PLANETS_LIST:
            return {
                ...state,
                planetList: action.payload,
            }
        default:
            return state;
    }
}