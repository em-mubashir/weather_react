import { WeatherData } from '.';

/**
 * WEATHER TYPES START
 */

 export const GET_WEATHER = 'GET_WEATHER';
 export const SET_LOADING = 'SET_LOADING';
 export const SET_ERROR = 'SET_ERROR';
 export const SET_ALERT = 'SET_ALERT';

 interface GetWeatherAction {
  type: typeof GET_WEATHER;
  payload: WeatherData;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}


export interface AlertAction {
	type: typeof SET_ALERT;
	payload: string;
}

export type WeatherAction = GetWeatherAction | SetLoadingAction | SetErrorAction;


