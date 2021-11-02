import React,{FC,useEffect} from 'react';
import {useSelector} from "react-redux"
import { useDispatch } from 'react-redux';
import { RootState } from './store';
import Search from './componenets/Search';
import {setError } from './store/actions/Weather';
import { getForcast, setLoading } from './store/actions/Weather';
import Weather from "./componenets/Weather"
import TempConverter from "./componenets/TempConverter"
import weatherService from "./services/weatherService"
import Chart from "./componenets/chart"
import './App.css';

const App: FC= ()=> {
  const dispatch = useDispatch();
  const weatherData = useSelector((state:RootState)=>state.weather.data)
  const loading = useSelector((state:RootState)=>state.weather.loading)
  
  const error = useSelector((state:RootState)=>state.weather.error)
useEffect(() => {
  dispatch(setLoading());
  dispatch(getForcast(weatherData?.coord.lat!,weatherData?.coord.lon!));
}, [weatherData])
 
  
  return (
    <div className="App">
      <header className="App-header">
       The Weather App
      </header>
      <body>
      <div className="container mt-4">
        <div className="row">
          <Search />
        </div>
        {console.log("weatherData",weatherData)}
      {loading ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherData && 
      <div className="row"> <div className="col-sm"><Weather data={weatherData} /> </div><div className="col-sm"><TempConverter   data={weatherData}/></div></div>}
      <Chart />
    </div>
      </body>
    </div>
  );
}

export default App;
