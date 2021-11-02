import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { WeatherData, WeatherError,ForcastData } from '../types';
import {WeatherAction, GET_WEATHER, SET_LOADING, SET_ERROR,GET_FORCAST} from "../types/actions"
import weatherService from "../../services/weatherService"

export const getWeather = (type:string,city: string): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const res = await weatherService.getWeather(type,city);
      if(!res) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: WeatherData =  res;
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


export const getForcast = (lat:number,lan: number): ThunkAction<void, RootState, null, WeatherAction> => {
  return async dispatch => {
    try {
      const res = await weatherService.getHourlyForcast(lat,lan);
      if(!res) {
        const resData: WeatherError = await res.json();
        throw new Error(resData.message);
      }

      const resData: ForcastData =  res;
      dispatch({
        type: GET_FORCAST,
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