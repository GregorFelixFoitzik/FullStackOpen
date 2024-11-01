import React from 'react'

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
export const DisplayPhonebook = ({persons}) => {
    return (
      <>
        {persons.map(person => <DisplayPerson key={person.name} person={person} />)}
      </>
    )
  }
const DisplayPerson = ({person}) => <div>{person.name} {person.number}</div>