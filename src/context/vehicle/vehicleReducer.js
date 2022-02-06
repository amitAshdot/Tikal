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
// peopleList: mockVehicleResults,
//     pilotsList: [],
//         vehicleList: [],
//             planetsList: [],
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

        case SET_SUM_MAP:
            return {
                ...state,
                sumMap: action.payload,
            }

        case SET_PLANETS:
            return {
                ...state,
                planetsMap: action.payload,
            }
        default:
            return state;
    }
}