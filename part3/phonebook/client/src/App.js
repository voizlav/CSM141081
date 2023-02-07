import { useState, useEffect } from "react";
import service from "./service/persons";

const Header = ({ heading }) => <h2>{heading}</h2>;

const Display = ({ person: { name, number } }) => (
  <p>
    {name} {number}
  </p>
);

const Notification = ({ message, type }) =>
  message === null ? null : (
    <div className={type}>
      <pre>{message}</pre>
    </div>
  );

const Input = ({ title, value, trigger }) => (
  <div>
    {title}: <input value={value} onChange={trigger} />
  </div>
);

const AddPersonForm = ({ add, name, number, newName, newNumber }) => (
  <div>
    <form onSubmit={add}>
      <Input title={"name"} value={name} trigger={newName} />
      <Input title={"number"} value={number} trigger={newNumber} />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
);

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    service.getAllPersons().then((personsData) => setPersons(personsData));
  }, []);

  const updatePersonNumber = (personData) => {
    if (window.confirm(`${personData.name} already exist, change number?`))
      service
        .updatePerson(personData.id, { ...personData, number: newNumber })
        .then((result) =>
          setPersons(
            persons.map((person) => (person.id === result.id ? result : person))
          )
        )
        .catch((error) => {
          setErrorMsg(error.response.data.error);
          setTimeout(() => {
            setErrorMsg(null);
          }, 3000);
        });
  };

  const addPerson = (e) => {
    e.preventDefault();

    const personData = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    if (personData) updatePersonNumber(personData);
    else
      service
        .createPerson({ name: newName, number: newNumber })
        .then((newPersonData) => {
          setPersons(persons.concat(newPersonData));
          setSuccessMsg(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMsg(null);
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setErrorMsg(error.response.data.error);
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
        });

    setNewName("");
    setNewNumber("");
  };

  const removePerson = (personData) => {
    if (window.confirm(`Delete ${personData.name}?`))
      service
        .deletePerson(personData.id)
        .then(
          setPersons(persons.filter((person) => person.id !== personData.id))
        )
        .catch(() => {
          setErrorMsg("Data already removed");
          setTimeout(() => {
            setErrorMsg(null);
          }, 5000);
        });
  };

  const filtered = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase())
  );

  return (
    <div>
      <Header heading={"Phonebook"} />
      <Notification message={successMsg} type={"success"} />
      <Notification message={errorMsg} type={"error"} />
      <Input
        title={"filter shown with"}
        value={newFilter}
        trigger={(e) => setNewFilter(e.target.value)}
      />
      <Header heading={"Add new"} />
      <AddPersonForm
        add={addPerson}
        name={newName}
        number={newNumber}
        newName={(e) => setNewName(e.target.value)}
        newNumber={(e) => setNewNumber(e.target.value)}
      />
      <Header heading={"Numbers"} />
      {filtered.map((person) => (
        <div key={person.id}>
          <Display person={person} />
          <button onClick={() => removePerson(person)}>remove</button>
        </div>
      ))}
    </div>
  );
};

export default App;
