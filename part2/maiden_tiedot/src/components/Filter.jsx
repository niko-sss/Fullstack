import Show from "./Show"

const Filter = ({ countries, filterer }) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterer.toLowerCase()))

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (filteredCountries.length === 1) {
    const imgSrc = filteredCountries[0].flags.png
    const imgAlt = filteredCountries[0].flags.alt
    return (
      <div>
        <h1>{filteredCountries[0].name.common}</h1>
        <br />
        <p>Capital {filteredCountries[0].capital[0]}</p>
        <p>Area {filteredCountries[0].area}</p>
        <br />
        <h2>Languages</h2>
        <br />
        <ul>
          {Object.values(filteredCountries[0].languages).map((language, index) => {
            return <li key={index}>{language}</li>
          })}
        </ul>
        <br />
        <img src={imgSrc} alt={imgAlt} />
      </div>
    )
  }

  return (
    <div>
      <ul>
        {filteredCountries.map((country, index) =>
          <li key={index}>{country.name.common} <Show country={country}/></li>
        )}
      </ul>
    </div>
  )
}

export default Filter