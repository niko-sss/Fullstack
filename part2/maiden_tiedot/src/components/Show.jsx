import { useState } from "react"

const Show = ({ country }) => {

  const [visible, setVisible] = useState(false)
  const imgSrc = country.flags.png
  const imgAlt = country.flags.alt
  const handleClick = () => {
    setVisible(!visible)
  }
  return (
    <>
      {!visible &&
        <button onClick={handleClick}>Show</button>
      }
      {visible &&
        <div style={{ border: 'solid 1px black', padding: '5px 5px 5px 9px' }}>
          <span><button style={{ display: "flex", alignItems: "center" }} onClick={handleClick}>Hide</button></span>
          <br />
          <h1>{country.name.common}</h1>
          <br />
          <p>Capital {country.capital[0]}</p>
          <p>Area {country.area}</p>
          <br />
          <h2>Languages</h2>
          <br />
          <ul>
            {Object.values(country.languages).map((language, index) => {
              return <li key={index}>{language}</li>
            })}
          </ul>
          <br />
          <img src={imgSrc} alt={imgAlt} />
        </div>

      }
    </>
  )
}

export default Show