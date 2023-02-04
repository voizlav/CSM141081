import axios from "axios";
const BASEURL = "/api/persons";

const getAllPersons = () => axios.get(BASEURL).then((res) => res.data);

const createPerson = (newPerson) =>
  axios.post(BASEURL, newPerson).then((res) => res.data);

const deletePerson = (id) => axios.delete(`${BASEURL}/${id}`);

const updatePerson = (id, editPerson) =>
  axios.put(`${BASEURL}/${id}`, editPerson).then((res) => res.data);

export default { getAllPersons, createPerson, deletePerson, updatePerson };
