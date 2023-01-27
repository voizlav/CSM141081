import { useState, useEffect } from 'react'
import service from './service/persons'


const Header = ({heading}) => <h2>{heading}</h2>


const Display = ({person: {name, number}}) => <p>{name} {number}</p>


const Notification = ({message}) => 
  message === null ? null : <div className='success'><p>{message}</p></div>


const Input = ({title, value, trigger}) => 
  <div>{title}: <input value={value} onChange={trigger}/></div>


const AddPersonForm = ({add, name, number, newName, newNumber}) =>
  <div>
    <form onSubmit={add}>
      <Input title={'name'} value={name} trigger={newName} />
      <Input title={'number'} value={number} trigger={newNumber} />
      <div>
      <button type='submit'>add</button>
      </div>
    </form>
  </div>


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMsg, setSuccessMsg] = useState(null)

  useEffect(() => {
    service.getAllPersons().then(personsData => setPersons(personsData))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    const p = persons.find(person => 
      person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())

    if (typeof p === 'object') {
      if (window.confirm(`${p.name} already exist, change number?`)) {
        service.updatePerson(p.id, { ...p, number: newNumber })
        setPersons(persons.map(person => 
          person.id === p.id 
          ? { ...p, number: newNumber } 
          : person))
      }
    } else {
      service.createPerson({ name: newName, number: newNumber })
      .then(newPersonData => setPersons(persons.concat(newPersonData)))
    }
    
    setNewName('')
    setNewNumber('')
    setSuccessMsg(`Added ${newName}`)
    setTimeout(() => {
      setSuccessMsg(null)
    }, 3000);
  }

  const removePerson = (id) => {
    service.deletePerson(id)
    setPersons(persons.filter(person => person.id !== id))
  }

  const filtered = persons.filter(person => 
    person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))

  return (
    <div>
      <Header heading={'Phonebook'} />
      <Notification message={successMsg} />
      <Input 
        title={'filter shown with'} 
        value={newFilter} 
        trigger={(e) => setNewFilter(e.target.value)} 
      />
      <Header heading={'Add new'} />
      <AddPersonForm 
        add={addPerson} 
        name={newName} 
        number={newNumber} 
        newName={(e) => setNewName(e.target.value)}
        newNumber={(e) => setNewNumber(e.target.value)}
      />
      <Header heading={'Numbers'} />
      {
      filtered.map(person => 
        <div key={person.id}>
          <Display person={person} />
          <button onClick={() => 
            window.confirm(`Delete ${person.name}?`)
            ? removePerson(person.id) : null } >
            remove
          </button>
        </div>
        )
      }
    </div>
  )
}


export default App