import { useState } from 'react'
import { Filter, AddingForm, DisplayPhonebook } from './components/htmlComponents'

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

  // Filter 
  const [showAll, setShowAll] = useState(
    ''
  )

  const handlePersonsFilter = (event) => {
    setShowAll(event.target.value)
  }

  // condition ? true : false
  const personsToShow = (showAll===true) ? persons : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  // App
  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={showAll} onChange={handlePersonsFilter}/>
      <h2>add a new</h2>
      <AddingForm onSubmit={addName}
        valueName={newName} onChangeName={handlePersonsChange} 
        valueNumber={newNumber} onChangeNumber={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <DisplayPhonebook persons={personsToShow} />
    </div>
  )
}

export default App