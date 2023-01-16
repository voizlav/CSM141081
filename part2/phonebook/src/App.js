import { useState } from 'react'


const Header = ({heading}) => <h2>{heading}</h2>

const Display = ({person: {name, number}}) => <p>{name} {number}</p>

const Button = ({title}) => <button type='submit'>{title}</button>

const Input = ({title, value, trigger}) => 
  <div>{title}: <input value={value} onChange={trigger}/></div>

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
        <Input title={'name'} value={newName} trigger={(e) => setNewName(e.target.value)} />
        <Input title={'number'} value={newNumber} trigger={(e) => setNewNumber(e.target.value)} />
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