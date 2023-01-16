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
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (e) => {
    e.preventDefault()

    persons.every(person => person.name === newName)
    ? alert(`${newName} already in phonebook`)
    : setPersons([...persons, { name: newName, number: newNumber }])

    setNewName('')
    setNewNumber('')
  }

  const filtered = persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <Header heading={'Phonebook'} />
      <Input title={'filter'} value={newFilter} trigger={(e) => setNewFilter(e.target.value)} />
      <Header heading={'Add new'} />
      <form onSubmit={addPerson}>
        <Input title={'name'} value={newName} trigger={(e) => setNewName(e.target.value)} />
        <Input title={'number'} value={newNumber} trigger={(e) => setNewNumber(e.target.value)} />
        <div>
          <Button title={'add'} />
        </div>
      </form>
      <Header heading={'Numbers'} />
      {filtered.map(person => <Display key={person.name} person={person} />)}
    </div>
  )
}

export default App