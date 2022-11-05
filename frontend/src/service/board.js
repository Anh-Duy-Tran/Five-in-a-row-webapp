import axios from 'axios';

const url = 'http://localhost:3001/api/board'


const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(url, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const request = axios.delete(`${url}/${id}`)
  return request.then(response => response.data)
}

const service = { getAll, create, remove }

export default service