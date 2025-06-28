import DelButton from "./del_button"

const Filter = ({persons, filter, setPersons}) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
  if (filteredPersons.length === 0) {
    return (
      <div>No Contacts...</div>
      )
  
  } else if (filter.length === 0) {
    return (
        persons.map(person =>
            <li key={person.id}>{person.name} {person.number} <DelButton id={`${person.id}`} setPersons={setPersons} persons={persons}/></li>
          )
    )
  } else {
    return (
      filteredPersons.map(person =>
        <li key={person.id}>{person.name} {person.number} <DelButton id={`${person.id}`} setPersons={setPersons} persons={persons}/></li>
      )
    )
  }
}

export default Filter
