import { useState } from 'react'


const Header = ({heading}) => <h2>{heading}</h2>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  return (
    <div>
      <Header heading={'Phonebook'} />
      <form>
        <div>
          name: <input />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Header heading={'Numbers'} />
      ...
    </div>
  )
}

export default App