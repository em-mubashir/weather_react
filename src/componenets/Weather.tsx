import React,{ FC, useState  } from "react";
import {WeatherData } from "../store/types"
interface IWeatherProps{
	data: WeatherData
}
const Search :FC<IWeatherProps> =({data})=>{
	 const fahrenheit = (data.main.temp * 1.8 - 459.67).toFixed(2);
  	const celsius = (data.main.temp - 273.15).toFixed(2);
const [flag,setFlag] = useState(false)

		
	return (

		<>
	<div className="container">
		<h4>Today's Forecast for {data.name}  - {data.sys.country}</h4>
		<div className="row">
			<div className="col-sm">
<div><b>Current temperature</b> in fahrenheit =  {fahrenheit} and celsius = {celsius}</div>
<div><b>Weather condition</b> {data.weather[0].main}</div>
<div><b>Highest temperature</b> {data.main.temp_max} , <b>Lowest temperature</b> {data.main.temp_min}</div>
			</div>
			<div className="col-sm">
			<img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt=""/>
			</div>
			
		</div>
		
		{flag ? <div className="row"><div className="col"><div>Wind Speed {data.wind.speed}</div><div>Humidity {data.main.humidity}</div> <div>Pressure {data.main.pressure}</div></div></div> : ""}
		
		<button className="btn btn-primary mt-1" onClick={()=>setFlag(!flag)}>{flag ? "Show Less" :"Show More"}</button>
	
	</div>
		</>
	
	);
}

export default Search;