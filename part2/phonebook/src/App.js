import { useState } from 'react'


const Header = ({heading}) => <h2>{heading}</h2>

const Display = ({person: {name, number}}) => <p>{name} {number}</p>

const Button = ({title}) => <button type='submit'>{title}</button>

const Input = ({title, value, trigger}) => 
  <div>{title}: <input value={value} onChange={trigger}/></div>

const Form = ({add, name, number, newName, newNumber}) =>
  <div>
    <form onSubmit={add}>
      <Input title={'name'} value={name} trigger={newName} />
      <Input title={'number'} value={number} trigger={newNumber} />
      <div>
        <Button title={'add'} />
      </div>
    </form>
  </div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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

  const filtered = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))

  return (
    <div>
      <Header heading={'Phonebook'} />
      <Input title={'filter shown with'} value={newFilter} trigger={(e) => setNewFilter(e.target.value)} />
      <Header heading={'Add new'} />
      <Form 
        add={addPerson} 
        name={newName} 
        number={newNumber} 
        newName={(e) => setNewName(e.target.value)}
        newNumber={(e) => setNewNumber(e.target.value)}
      />
      <Header heading={'Numbers'} />
      {filtered.map(person => <Display key={person.name} person={person} />)}
    </div>
  )
}

export default App