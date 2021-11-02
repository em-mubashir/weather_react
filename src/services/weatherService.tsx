import axios from 'axios';

const weatherService = {

    getWeather: (type:string,city: string) => {
        return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?${type}=${city}&appid=${process.env.REACT_APP_WEATHER__KEY}`)
            .then(res =>res.data)
            .catch(err => err);
    },
    getHourlyForcast:(lat:number,lon: number) =>{
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.REACT_APP_WEATHER__KEY}`)
        .then(res => res.data)
        .catch(err => err);
    }
    

};

export default weatherService;