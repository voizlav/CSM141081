import { useState } from 'react'


const Header = ({heading}) => <h2>{heading}</h2>

const Display = ({name}) => <p>{name}</p>

const Button = ({title}) => <button type='submit'>{title}</button>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (e) => {
    e.preventDefault()

    !persons.map(person => person.name).includes(newName)
    ? setPersons([...persons, { name: newName }])
    : alert(`${newName} already in phonebook`)

    setNewName('')
  }

  return (
    <div>
      <Header heading={'Phonebook'} />
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          <Button title={'new'} />
        </div>
      </form>
      <Header heading={'Numbers'} />
      {persons.map(person => <Display key={person.name} name={person.name} />)}
    </div>
  )
}

export default App