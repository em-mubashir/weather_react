export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface WeatherData {
  base: string;
  clouds: {
    all: number;
  };
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  dt: number;
  id: number;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    country: string;
    id: number;
    sunrise: number;
    sunset: number;
    type: number;
  };
  timezone: number;
  visibility: number;
  weather: Weather[];
  wind: {
    speed: number;
    deg: number;
  };
}

export interface ForcastData {
  current: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
temp: number;
uvi:number;
visibility:number;
weather: Weather[];
wind_deg: number;
wind_gust: number;
wind_speed: number;
  };


daily: DailyWeather[]
  lat: number;
  lon: number;
  timezone:string;
  timezone_offset:number;
}


interface DailyWeather {
  clouds:number;
  dew_point: number;
  dt: number;
  feels_like:{
    day:number;
    night:number;
    eve: number;
    morn:number;
  }
  humidity:number;
  moon_phase:number;
  moonrise:number;
  pop: number;
  pressure:number;
  sunrise:number;
  sunset:number;
  temp:{
    day:number;
    min:number;
    max:number;
    night:number
    eve:number;
    morn: number;
  }
  uvi: number;
  weather: Weather[];
  wind_deg: number;
  wind_gust: number;
  wind_speed: number;
}
export interface WeatherError {
  cod: string;
  message: string;
}

export interface WeatherState {
  data: WeatherData | null;
  forcast:ForcastData| null;
  loading: boolean;
  error: string;
}


