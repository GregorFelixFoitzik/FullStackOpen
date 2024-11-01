import { useState } from 'react'
import { regexFinishNumbers } from './components/regexNumber'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567', 
    }
  ]) 
  const [newName, setNewName] = useState(
    'adding new name'
  )
  const [newNumber, setNewNumber] = useState(
    'adding new number'
  )

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }
    
    const onlyNames =  persons.map(person => person.name)
    // https://stackoverflow.com/a/56474783
    if (onlyNames.includes(nameObject.name)) {
      alert(`${nameObject.name} is already added to phonebook.`)
    } else { 
      setPersons(persons.concat(nameObject))
      setNewName('')
    }  
  }

  const handlePersonsChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const DisplayPhonebook = ({persons}) => {
    return (
      <>
        {persons.map(person => <DisplayPerson key={person.name} person={person} />)}
      </>
    )
  }
  const DisplayPerson = ({person}) => <div>{person.name} {person.number}</div>

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlePersonsChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <DisplayPhonebook persons={persons} />
    </div>
  )
}

export default App