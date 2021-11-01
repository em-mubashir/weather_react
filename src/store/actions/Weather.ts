import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { WeatherData, WeatherError } from '../types';
import {WeatherAction, GET_WEATHER, SET_LOADING, SET_ERROR} from "../types/actions"
import weatherService from "../../services/weatherService"

export const getWeather = (city: string): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const res = await weatherService.getWeather(city);
      if(!res.ok) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeatherData = await res.json();
      dispatch({
        type: GET_WEATHER,
        payload: resData
      });
    }catch(err) {
      if(err instanceof Error)
      dispatch({
        type: SET_ERROR,
        payload: err.message
      });
    }
  }
}

export const setLoading = (): WeatherAction => {
  return {
    type: SET_LOADING
  }
}

export const setError = (): WeatherAction => {
  return {
    type: SET_ERROR,
    payload: ''
  }
}