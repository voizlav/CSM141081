import { useState, useEffect } from 'react'
import axios from 'axios'


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
        {filtered.map(country => 
          <DisplayCountries key={country.flag} country={country} />)}
      </div>
    </>
  )
}

export default App