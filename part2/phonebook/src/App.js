import { useState, useEffect } from 'react'
import axios from 'axios'
import service from './service/persons'


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
  const [persons, setPersons] = useState([{ name: 'Arto Hellas', number: '040-123456'}]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    service.getAllPersons().then(personsData => setPersons(personsData))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    persons.find(person => 
      person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
      ? alert(`${newName} already in phonebook`)
      : service.createPerson({ name: newName, number: newNumber })
      .then(newPersonData => setPersons(persons.concat(newPersonData)))

    setNewName('')
    setNewNumber('')
  }

  const filtered = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))

  return (
    <div>
      <Header heading={'Phonebook'} />
      <Input 
        title={'filter shown with'} 
        value={newFilter} 
        trigger={(e) => setNewFilter(e.target.value)} 
      />
      <Header heading={'Add new'} />
      <Form 
        add={addPerson} 
        name={newName} 
        number={newNumber} 
        newName={(e) => setNewName(e.target.value)}
        newNumber={(e) => setNewNumber(e.target.value)}
      />
      <Header heading={'Numbers'} />
      {filtered.map(person => 
        <Display key={person.name} person={person} />)}
    </div>
  )
}


export default App