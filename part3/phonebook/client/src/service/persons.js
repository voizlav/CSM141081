import axios from "axios";
const BASEURL = "/api/persons";

const getAllPersons = () => axios.get(BASEURL).then((res) => res.data);

const createPerson = (newPerson) =>
  axios.post(BASEURL, newPerson).then((res) => res.data);

const deletePerson = (id) => axios.delete(`${BASEURL}/${id}`);

export default { getAllPersons, createPerson, updatePerson, deletePerson };
