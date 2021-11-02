import { WeatherState} from "../types";
import {WeatherAction, GET_WEATHER, SET_LOADING, SET_ERROR,GET_FORCAST} from "../types/actions"
const initialState: WeatherState = {
  data: null,
  forcast: null,
  loading: false,
  error: ''
}

export default (state = initialState, action: WeatherAction): WeatherState => {
  switch(action.type) {
    case GET_WEATHER:
      return {
        data: action.payload,
        forcast:null,
        loading: false,
        error: ''
      }
      case GET_FORCAST:
      return {
        data:state.data,
        forcast: action.payload,
        loading: false,
        error: ''
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true
      }
    case SET_ERROR: 
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default: 
      return state;
  }
}