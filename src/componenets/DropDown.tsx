import React,{ FC ,ChangeEvent } from "react";

interface ISearchProps{
	title: string
	setSearchBy:(item:string)=> void;
}
const DropDown :FC<ISearchProps> =({title,setSearchBy})=>{

  
	const selectOption = (e: ChangeEvent<HTMLSelectElement>) => {
setSearchBy (e.target.value)
	}

	return (
<div className="dropdown">
	{title}
	<select onChange={selectOption} id="cars" name="cars">
    <option value="name">By Name</option>
    <option value="zip">By Zip</option>

  </select>
</div>
			
	);
}

export default DropDown;