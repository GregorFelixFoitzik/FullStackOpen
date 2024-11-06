import React from 'react'
import personsService from '../services/persons'

export const Filter = ({value, onChange}) => {
    return (
    <div>
        filter shown with: <input value={value} onChange={onChange}/>
    </div>
    )
}


export const AddingForm = ({onSubmit, valueName, onChangeName, valueNumber, onChangeNumber}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
            name: <input value={valueName} onChange={onChangeName}/>
            </div>
            <div>
            number: <input value={valueNumber} onChange={onChangeNumber}/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}


// Displaying Phonebook
export const DisplayPhonebook = ({persons, removePerson}) => {
    return (
      <>
        {persons.map(person => 
        <DisplayPerson 
          key={person.name} 
          person={person} 
          removePerson={removePerson}
        />)}
      </>
    )
  }
const DisplayPerson = ({person, removePerson}) => 
<div>
  {person.name} {person.number} 
  <button type="button" onClick={() => removePerson(person.id)}>Delete</button>
</div>