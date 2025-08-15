import { useState, useEffect } from "react"
import axios from 'axios'
import Filter from "./components/Filter"
import Show from "./components/Show"

const App = () => {
  const [filterer, setFilterer] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      }
      )
  }, [])



  const filterCountries = event => {
    const filter = event.target.value
    setFilterer(filter)
  }

  if (!countries) {
    return null
  }
  

  return (
    <div>
      {console.log(countries)}
      <div>
        find countries <input type="text" onChange={filterCountries}/>
      </div>
      <br/>
      <div>
        {filterer === '' &&
        <ul>
          {countries.map((country, index) =>
            <li key={index}><span>{country.name.common} <Show country={country}/></span></li>
          )}
        </ul> 
        }
        {filterer &&
          <Filter countries={countries} filterer={filterer} />
        }
      </div>
    </div>
  )
}

export default App