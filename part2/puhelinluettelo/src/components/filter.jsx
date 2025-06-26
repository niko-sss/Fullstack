
const Filter = ({persons, filter}) => {
  const filteredPersons = persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))
  if (filteredPersons.length === 0) {
    return (
      <div>No Contacts...</div>
      )
  
  } else if (filter.length === 0) {
    return (
        persons.map(person =>
            <li key={person.id}>{person.name} {person.number}</li>
          )
    )
  } else {
    return (
      filteredPersons.map(person =>
        <li key={person.id}>{person.name} {person.number}</li>
      )
    )
  }
}

export default Filter
