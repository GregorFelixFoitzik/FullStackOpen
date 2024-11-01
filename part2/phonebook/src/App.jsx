import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  // Phonebook Handling
  const [newName, setNewName] = useState(
    'adding new name'
  )
  const handlePersonsChange = (event) => {
    setNewName(event.target.value)
  }

  const [newNumber, setNewNumber] = useState(
    'adding new number'
  )
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

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


  // Displaying Phonebook
  const DisplayPhonebook = ({persons}) => {
    return (
      <>
        {persons.map(person => <DisplayPerson key={person.name} person={person} />)}
      </>
    )
  }
  const DisplayPerson = ({person}) => <div>{person.name} {person.number}</div>


  // Filter 
  const [showAll, setShowAll] = useState(
    ''
  )

  const handlePersonsFilter = (event) => {
    setShowAll(event.target.value)
  }

  // condition ? true : false
  const personsToShow = (showAll===true) ? persons : persons.filter(person => person.name.includes(showAll))

  // App
  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter shown with: <input value={showAll} onChange={handlePersonsFilter}/>
        </div>
      <h2>add a new</h2>
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
      <DisplayPhonebook persons={personsToShow} />
    </div>
  )
}

export default App