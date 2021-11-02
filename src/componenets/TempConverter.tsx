import React,{ FC, useState,FormEvent  } from "react";
import {WeatherData } from "../store/types"
interface IWeatherProps{
	data: WeatherData
}
const TempConverter :FC<IWeatherProps> =({data})=>{
  const [celsius,setCelsius] = useState(0);
  const [fahrenheit,setFahrenheit] = useState(0);
  const handleFahrenheit = (e: FormEvent<HTMLInputElement>) => {
	setFahrenheit(+e.currentTarget.value)
	setCelsius((+e.currentTarget.value- 32) * 5/9);
  }

  const handleCelsius = (e: FormEvent<HTMLInputElement>) => {

	setCelsius(+e.currentTarget.value)
	setFahrenheit(+e.currentTarget.value* 9/5 + 32);

  }
		
	return (

		<>
	 <div className="container">
            <div className= "form-group">
              <label><h3>Enter Temperature in Fahrenheit</h3></label>
              <input className="form-control container text-center" id="focusedInputed" type="text"  value={fahrenheit}
                  onChange={handleFahrenheit}  />
				  <label><h3>Enter Temperature in Celsius</h3></label>
					<input className="form-control container text-center" id="focusedInputed" type="text"   value={celsius}
                    onChange={handleCelsius}/>
            </div>
        </div>
		</>
	
	);
}

export default TempConverter;