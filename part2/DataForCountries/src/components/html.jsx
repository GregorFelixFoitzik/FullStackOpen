import React, { useState, useEffect } from 'react';
import countriesServices from '../services/countries'

export const SearchField = ({ value, onChange }) => {
    return (
      <div>
        find countries <input 
          name='search input' 
          value={value} 
          onChange={onChange}/>
      </div>
    )
  }

export const DisplayCountries = ({ fc_obj, onCountrySelect }) => {
    return ( 
      <div>
        { 
          fc_obj.length === 1 ? <FullInformation fc_obj={fc_obj}/>   :
          fc_obj.length <= 5  ? <ListCountries fc_obj={fc_obj} onCountrySelect={onCountrySelect}/> :
          <>Too many matches, specify another filter</>
        }
      </div>
    )
  }
 
// Simple List if too many
const ListCountries = ({ fc_obj, onCountrySelect }) => {
    return (
        <>
            {fc_obj.map(country => (
                <ListEntry key={country.cca2} country={country} onCountrySelect={onCountrySelect} />
            ))}
        </>
    )
}
const ListEntry = ({ country, onCountrySelect }) => {
    return (
        <div>
            {country.name.common}
            <button type='button' onClick={() => onCountrySelect(country)}> show </button>
        </div>
    )
}


// Detailed information about a country
const FullInformation = ({ fc_obj }) => {
    const [weatherData, setWeatherData] = useState([])
    const country = fc_obj[0]
    const flagUrl = `https://flagcdn.com/${country.tld[0].replace('.','')}.svg`
    
    let unvalidWeatherData
    if (!country.capitalInfo.latlng) {
        unvalidWeatherData = true
    } else {
        const latlon = country.capitalInfo.latlng
        useEffect(() => {
            countriesServices
              .getWeatherData(latlon[0], latlon[0])
              .then(data => {
                setWeatherData(data)
              })
              .catch(error => {console.error('Error:', error)})
          }, [])
        unvalidWeatherData = (!weatherData || weatherData.length === 0 || !weatherData.main)
    }

    return (
        <div>
            <BasicInformation country={country} />
            <img src={flagUrl}
                style={{ width:'50%', height:'auto' }}
            ></img>
            {unvalidWeatherData ? 
                <h1>No weather data available</h1> : 
                <WeatherInformation country={country} data={weatherData} />}
        </div>
    )
}

const BasicInformation = ({ country }) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital}</div>
            <div>capital {country.area}</div>
            <h3>languages:</h3>
            <ul>
                {Object.values(country.languages)
                .map((language, idx) => (
                    <li key={idx}>{language}</li>
                ))}
            </ul>
        </div>
    )
}

const WeatherInformation = ({ country, data }) => {
    const temperature = data.main.temp
    const windSpeed = data.wind.speed
    const iconUrl = countriesServices.getWeatherIcon(data.weather[0].icon)    

    return (
        <div>
            <h1>Weather in {country.capital}</h1>
            <div>temperature {temperature} Celccius</div>
            <img src={iconUrl}>
            </img>
            <div>wind {windSpeed} m/s</div>
        </div>
    )
}