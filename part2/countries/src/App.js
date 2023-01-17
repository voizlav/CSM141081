import { useState, useEffect } from 'react'
import axios from 'axios'


const DisplayCountry = ({country}) =>
  <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital[0]}</p>
    <p>area {country.area}</p>
    <h2>languages:</h2>
    <ul>
    {Object.values(country.languages).map(language => 
      <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} height='100'/>
  </>

const DisplayCountries = ({country}) => 
  <>
    <p>{country.name.common}</p>
  </>

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {axios.get('https://restcountries.com/v3.1/all')
  .then(res => setCountries(res.data))}, [])

  const filtered = [...countries.filter(country => 
    country.name.common.toLocaleLowerCase().includes(filter))]

  console.log(filtered)

  return (
    <>
      <div>
        find countries: 
        <input 
          value={filter} 
          onChange={(e) => setFilter(e.target.value.toLocaleLowerCase())} 
        />
      </div>
      <div>
        {filtered.length > 10 
        ? <p>Too many matches, specify another filter</p> 
        : filtered.length < 10 && filtered.length > 1
        ? filtered.map(country => <DisplayCountries key={country.flag} country={country} />)
        : filtered.map(country => <DisplayCountry key={country.flag} country={country} />)}
      </div>
    </>
  )
}

export default App