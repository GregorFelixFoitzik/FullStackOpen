import axios from 'axios'

const baseUrlCountries = 'https://studies.cs.helsinki.fi/restcountries'
const getAll = () => {
    const request = axios.get(`${baseUrlCountries}/api/all`)
    return request.then(response => response.data)
}
const getSingle = ( name ) => {
    const request = axios.get(`${baseUrlCountries}/api/name/${name}`)
    return request.then(response => response.data)
}


const apiKeyOWM = import.meta.env.VITE_SOME_KEY
const baseUrlWeather = `http://api.openweathermap.org`
const getWeatherData = ( lat, lon ) => {
  const request = axios.get(`${baseUrlWeather}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKeyOWM}&units=metric`)
  return request.then(response => response.data)
}
const getWeatherIcon = ( iconID ) => {
  return `https://openweathermap.org/img/wn/${iconID}@2x.png`
}


export default { 
  getAll: getAll,
  getSingle: getSingle,
  getWeatherData: getWeatherData,
  getWeatherIcon: getWeatherIcon,
}