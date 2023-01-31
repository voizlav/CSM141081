import axios from 'axios'
const BASEURL = 'http://localhost:3001/persons'


const getAllPersons = () => 
  axios.get(BASEURL).then(res => res.data)


const createPerson = (newPerson) => 
  axios.post(BASEURL, newPerson).then(res => res.data)


const updatePerson = (id, editPerson) => 
  axios.put(`${BASEURL}/${id}`, editPerson).then(res => res.data)


const deletePerson = (id) =>
  axios.delete(`${BASEURL}/${id}`)


export default { getAllPersons, createPerson, updatePerson, deletePerson }