import { useState } from 'react'
import FilterForm from './components/filter_form'
import PersonForm from './components/person_form'
import Filter from './components/filter'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123456',
      id: 1
    },
    { name: 'Arska Hella',
      number: '040-234567',
      id: 2

    }
     
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowed] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [mappedPersons, setMappedPersons] = useState([])

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhonenum = (event) => {
    setNewNumber(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    } 
    if (persons.some(person => person.name === personObject.name)) {
      alert(`${newName} is already added to phonebook`)
      return
    } else {
      return (
        setPersons(persons.concat(personObject)),
        setNewName(''),
        setNewNumber(''),
        console.log(persons)
      )
    }
  }

  const handleFilter = (event) => {
    setFilteredName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm handler={handleFilter} filter={filteredName}/>
      <h2>Add new</h2>
      <PersonForm addFunc={addContact} nameHandler={handleName} numHandler={handlePhonenum} name={newName} number={newNumber}/>
      <h2>Numbers</h2>
      <Filter persons={persons} filter={filteredName}/>
    </div>
  )
}

export default App
