import { useState, useEffect, useInsertionEffect } from 'react'
import * as htmlComps from './components/htmlComponents'
import personsServices from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)


  const hook = () => {
    personsServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }
  useEffect(hook, [])

  // Phonebook Handling
  const handlePersonsChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    }
    
    const existingPerson = persons.find(person => person.name === personObject.name)
    if ( existingPerson ) {
      if ( existingPerson.number !== personObject.number ) {
        if  ( window.confirm(`Do you want to update the number of ${personObject.name}?`) ) {
          personsServices
            .update(existingPerson.id, {...existingPerson, number: personObject.number })
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
              setNewName('')
              setNewNumber('')
              setNotification(`Updated number of ${personObject.name}`)
              setTimeout(() => {
                setNotification(null)
              }, 5000)
            })
          .catch(error => {
              setErrorMessage(`Information of ${person.name} has already been removed from server`),
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
        }
      }
      else {
        alert(`${personObject.name} is already added to phonebook.`)
      }
    }
    else {
      personsServices
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNotification(`Added ${personObject.name}`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const removePerson = ( id ) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Are you sure you want to delete this ${person.name}?`)) {
      personsServices
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotification(`Removed ${person.name}`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error =>
          setErrorMessage(`Information of ${person.name} has already been removed from server`),
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        )
    }
  }

  // Filter 
  const handlePersonsFilter = (event) => {
    setShowAll(event.target.value)
  }
  // condition ? true : false
  const personsToShow = (showAll===true) ? persons : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))




  // App
  return (
    <div>
      <h2>Phonebook</h2>
        <htmlComps.ErrorMessage message={errorMessage}/>
        <htmlComps.Notification message={notification}/>
        <htmlComps.Filter value={showAll} onChange={handlePersonsFilter}/>
      <h2>add a new</h2>
      <htmlComps.AddingForm onSubmit={addPerson}
        valueName={newName} onChangeName={handlePersonsChange} 
        valueNumber={newNumber} onChangeNumber={handleNumberChange} 
      />
      <h2>Numbers</h2>
      <htmlComps.DisplayPhonebook persons={personsToShow} setPersons={setPersons} removePerson={removePerson}/>
    </div>
  )
}

export default App