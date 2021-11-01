import axios from 'axios';

const weatherService = {

    getWeather: (city: string) => {
        return axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER__KEY}`)
            .then(res => res)
            .catch(err => err);
    },

};

export default weatherService;