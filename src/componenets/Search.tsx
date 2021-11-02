import React,{ FC ,useState, FormEvent } from "react";
import { useDispatch } from 'react-redux';
import { getWeather, setLoading } from '../store/actions/Weather';
import weatherService from "../services/weatherService"
import DropDown from "./DropDown"



interface ISearchProps{
	title: string
}
const Search :FC<ISearchProps> =({title})=>{
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
	  weatherService.getForcast(searchBy,city).then((res:any)=>console.log("res",res))
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
    <div className="col-md-5">
      <input	type="text"
				className="form-control"
				placeholder="Enter city name"
				value={city}
				onChange={changeHandler}/>
    </div>

	<div className="col-md-4"> 		<DropDown setSearchBy={setDropdown} title={""}/></div>
    <div className="col-md-3">
	<button className="btn btn-primary mb-2" >Search</button>
    </div>
  </div>
</form>
			
	);
}

export default Search;