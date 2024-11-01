import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState(
    'adding new name'
  )

  const addName = (event) => {
    event.preventDefault()
    const noteObject = {
      name: newName,
      id: String(persons.length + 1),
    }
  
    setPersons(persons.concat(noteObject))
    setNewName('')
  }

  const handlePersonsChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }



  const DisplayPhonebook = ({persons}) => {
    return (
      <>
        {persons.map(person => <DisplayPerson key={person.name} person={person} />)}
      </>
    )
  }
  const DisplayPerson = ({person}) => <div>{person.name}</div>

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handlePersonsChange}/>
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