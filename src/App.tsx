import React,{FC} from 'react';
import {useDispatch,useSelector} from "react-redux"
import { RootState } from './store';
import Search from './componenets/Search';
import {setError } from './store/actions/Weather';
import Weather from "./componenets/Weather"
import TempConverter from "./componenets/TempConverter"
import './App.css';

const App: FC= ()=> {
  const dispatch = useDispatch();
  const weatherData = useSelector((state:RootState)=>state.weather.data)
  const loading = useSelector((state:RootState)=>state.weather.loading)
  const error = useSelector((state:RootState)=>state.weather.error)
  
  return (
    <div className="App">
      <header className="App-header">
       The Weather App
      </header>
      <body>
      <div className="has-text-centered">
      <Search title="Enter city name" />
      {loading ? <h2 className="is-size-3 py-2">Loading...</h2> : weatherData && 
      <div> <div className="col"><Weather data={weatherData} /> </div><div className="col"><TempConverter   data={weatherData}/></div></div>}


    </div>
      </body>
    </div>
  );
}

export default App;
