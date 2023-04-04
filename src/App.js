
import './App.css';
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Country from './Country';


const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [tempa, setTempa] = useState([])

  const api_key = process.env.REACT_APP_API_KEY
  const hook = () => {
    console.log('effect')
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('fulfilled')
      console.log(process.env.REACT_APP_API_KEY)
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  const filtered =
    countries.filter(country => {
    return(country.name.common.toLowerCase().includes(search.toLowerCase()))
  })

  const output = () => {
    if(filtered.length > 10) {
      return(
        <div>Too many matches, specify another filter</div>
      )
    } else if (filtered.length > 1 && filtered.length <= 10) {
      return(
        filtered.map((country) => {
        return (
          <div>
            <p key = {country.name.common}>
            {country.name.common} <button onClick={() => displayThis(country.tld[0])}>show</button>
          </p>
          
          <div>
          {tempa.includes(country.tld[0]) && <Country country={country}/>}
          </div>


          </div>


        )
      }))
    } else if (filtered.length === 1 ) {
        return (
          <Country country={filtered[0]}/>
        )
    }
  }


  const displayThis = (country) => {
    const display = tempa.slice()
    console.log(tempa)
    if(display.includes(country)) {
      setTempa(display.filter(item => item !== country))
    } else {
      setTempa(display.concat(country))
    }
    console.log(tempa)
  }



  return (
    <div className="App">
      <div>
        find countries <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
      <div>
        {output()}
      </div>


    </div>
  )
}
export default App;
