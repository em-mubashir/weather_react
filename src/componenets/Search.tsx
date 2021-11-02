import React,{ FC ,useState, FormEvent } from "react";
import { useDispatch,useSelector } from 'react-redux';
import { getWeather, setLoading } from '../store/actions/Weather';
import weatherService from "../services/weatherService"
import DropDown from "./DropDown"


const Search :FC =()=>{
	const dispatch = useDispatch();
	const [city, setCity] = useState('');
	const [searchBy, setSearchBy] = useState('q');
  
	const changeHandler = (e: FormEvent<HTMLInputElement>) => {
	  setCity(e.currentTarget.value);
	}
  
	const submitHandler = (e: FormEvent<HTMLFormElement>) => {
	  e.preventDefault();
  
	  if(city.trim() === '') {
		 alert('City is required!');
	  }
  else{
	  dispatch(setLoading());
	  dispatch(getWeather(searchBy,city));
	  setCity('');
	}
	}

	const setDropdown = (item:string) => {
		if(item === "zip"){
			setSearchBy('zip')
		}else{
			setSearchBy('q')
		}
		
	}
	return (
<form onSubmit={submitHandler}>
  <div className="row">
    <div className="col-md-5 col-sm">
      <input	type="text"
				className="form-control"
				placeholder="Enter city name"
				value={city}
				onChange={changeHandler}/>
    </div>

	<div className="col-md-4 col-sm mt-1" > 		<DropDown setSearchBy={setDropdown} title={""}/></div>
    <div className="col-md-3 col-sm mt-1"  >
	<button className="btn btn-primary mb-2" >Search</button>
    </div>
  </div>
</form>
			
	);
}

export default Search;