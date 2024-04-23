import axios from 'axios'

export const api = axios.create({
  baseURL:
    'https://my-json-server.typicode.com/feponiel/ignite-courses-vault/tree/main/ignite-reactjs/projects/project-03',
})
