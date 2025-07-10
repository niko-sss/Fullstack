import { useState } from 'react'
import { useEffect } from 'react'
import FilterForm from './components/filter_form'
import PersonForm from './components/person_form'
import Filter from './components/filter'
import DelButton from './components/del_button'
import personService from './services/persons'

const AddNotification = ({message, setAddMsg}) => {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setAddMsg(null)
    }, 4000)
    return () => clearTimeout(timeOut)
  }, [])
  const styles = {
    color: 'black',
    fontStyle: 'italic',
    backgroundColor: 'palegreen',
    fontSize: 'large'
  }
  return (
    <>
    <div>
      <p className='added' style={styles}>
        {message}
      </p>
    </div>
    </>
  )
}

const ChangeNotification = ({message, setChangeMsg, setIsChanged, isChanged}) => {
  useEffect(() => {
    if (isChanged !== null) {
      const timeout = setTimeout(() => {
        setChangeMsg(null);
        setIsChanged(null);
      }, 6000);
      return () => clearTimeout(timeout)
    }
  }, [isChanged, setChangeMsg, setIsChanged]);

  if (isChanged === true) {
    const styles = {
      backgroundColor: 'lightgreen',
      color: 'black',
      fontStyle: 'italic',
      fontSize: 'large'
    }
    return (
      <div style={styles}>{message}</div>
    )
  } else if (isChanged === false) {
    const styles = {
      backgroundColor: 'indianred',
      color: 'black',
      fontStyle: 'italic',
      fontSize: 'large'
    }
    return (
      <div style={styles}>{message}</div>
    );
  } else {
    return null;
  }
}



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const [addMsg, setAddMsg] = useState(null)
  const [changeMsg, setChangeMsg] = useState(null)
  const [isChanged, setIsChanged] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: `${persons.length + 1}`
    }
    const personToCheck = persons.filter(person => person.name === personObject.name)
    const personToPost = {...personToCheck[0], number: personObject.number}

    
    if (personToCheck.length > 0) {
      if (window.confirm('Person already found. Do you want to change the phone number?')) {
        personService
          .update(personToCheck[0].id, personToPost)
          .then(() => personService.getAll())
          .then(response => {
            setPersons(response.data)
            setIsChanged(true)
            setChangeMsg(`${personToPost.name}'s phone number change succeeded`)
          })
          .catch(error => {
            setIsChanged(false)
            setChangeMsg(`${personToPost.name} is deleted already`)
          })
        return
      } else {
        return
      }
    }
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setAddMsg(`${personObject.name} added`)
      })
      .catch(error => {
        setIsChanged(false)
        setChangeMsg(`${error.response.data.error}`)
        
      })
  }


const handleName = (event) => {
  setNewName(event.target.value)
}

const handlePhonenum = (event) => {
  setNewNumber(event.target.value)
}


const handleFilter = (event) => {
  setFilteredName(event.target.value)
}

return (
  <div>
      <h2>Phonebook</h2>
      {changeMsg && <ChangeNotification message={changeMsg} setChangeMsg={setChangeMsg} setIsChanged={setIsChanged} isChanged={isChanged}/>}
      <FilterForm handler={handleFilter} filter={filteredName}/>
      <h2>Add new</h2>
      {addMsg && <AddNotification message={addMsg} setAddMsg={setAddMsg} />}
      <PersonForm addFunc={addContact} nameHandler={handleName} numHandler={handlePhonenum} name={newName} number={newNumber}/>
      <h2>Numbers</h2>
      <Filter persons={persons} filter={filteredName} setPersons={setPersons}/>
    </div>
  )
}

export default App
