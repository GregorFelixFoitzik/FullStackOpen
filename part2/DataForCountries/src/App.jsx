import React, { useState, useEffect } from 'react'
import countriesServices from './services/countries'
import * as html from './components/html'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    countriesServices
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  const filterContriesByName = (search) => {
    return countries.filter(
      country => country.name.common.toLowerCase().includes(search.toLowerCase())
    )
  }

  useEffect(() => {
    const results = filterContriesByName(search)
    setFilteredCountries(results)
  }, [search, countries])



  const handleSearchChange = (event) => {
     setSearch(event.target.value)
  }
  const handleShowSingle = (country) => {
    setFilteredCountries([country])
  }


  return (
    <div>
      <html.SearchField value={search} onChange={handleSearchChange}/>
      <html.DisplayCountries fc_obj={filteredCountries} onCountrySelect={handleShowSingle}/>
    </div>
  )
}


export default App
