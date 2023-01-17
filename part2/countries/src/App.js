import { useState, useEffect } from 'react'
import axios from 'axios'


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
      find countries: 
      <input 
        value={filter} 
        onChange={(e) => setFilter(e.target.value.toLocaleLowerCase())} 
      />
    </>
  )
}

export default App