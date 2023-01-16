import { useState } from 'react'


const Header = ({heading}) => <h2>{heading}</h2>

const Display = ({person}) => <p>{person.name} {person.number}</p>

const Button = ({title}) => <button type='submit'>{title}</button>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    
    !persons.map(person => person.name).includes(newName)
    ? setPersons([...persons, { name: newName, number: newNumber }])
    : alert(`${newName} already in phonebook`)

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <Header heading={'Phonebook'} />
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <Button title={'new'} />
        </div>
      </form>
      <Header heading={'Numbers'} />
      {persons.map(person => <Display key={person.name} person={person} />)}
    </div>
  )
}

export default App