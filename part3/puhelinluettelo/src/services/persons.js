import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = personObject => {
  return axios.post(baseUrl, personObject)
}

const update = (id, personObject) => {
  return axios.put(`${baseUrl}/${id}`, personObject)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`).catch(err => console.error('err msg:', err))
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  deletePerson: deletePerson
}