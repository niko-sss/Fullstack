import personService from '../services/persons'


const DelButton = ({id, setPersons, persons}) => {
    const handleDelete = () => {
        if (window.confirm(`Are you sure to delete`)) {
            personService
                .deletePerson(id)
                .then(personService.getAll())
                .then(setPersons(persons.filter(person => person.id != id)))

        } else {
            return
        }
    }
    return <button onClick={handleDelete}>delete</button>
}

export default DelButton
