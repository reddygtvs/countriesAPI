import axios from 'axios';
import { useState, useEffect } from 'react';

const Country = ( {country} ) => {
    const[data, setData] = useState([])
    const[confirm, setConfirm] = useState(0)
    const language = () => {
        const l = country.languages;
        
        const entries = Object.values(l)
        return (
                entries.map(languages => {
                        return (
                        <ul>{languages}</ul>
                        
                        )
                })
        )
        
    }
    const hookb = () => {
        console.log('effectW')
        const lat = country.latlng[0]
        const long = country.latlng[1]
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=hourly,minutely,daily,alerts&appid=${process.env.REACT_APP_API_KEY}`).then(response => {
          console.log('fulfilledW')
          console.log(process.env.REACT_APP_API_KEY)
          console.log(response.data)
          setConfirm(1)

          setData(response.data)
         
        })
      }
      useEffect(hookb, [])
    const weather = () => {
        return (
            <div>
                <h2>Weather in {country.name.common}</h2>
                <p>Temperature: {data.current.temp} Celsius</p>
                <img src={`https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`} />
                <p>Wind: {data.current.wind_speed} m/s </p>
                
            </div>
            
        )
    }


    return(
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital[0]}</p>
            <p>Area: {country.area} </p>
            <h3>Languages:</h3>
            {language()}
            <img src={country.flags.png} />
            {confirm && weather()}
            
        </div>
    )
}

export default Country;