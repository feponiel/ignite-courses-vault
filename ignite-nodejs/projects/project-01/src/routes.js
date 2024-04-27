import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { search } = req.query

      const users = database.select('users', search ? {
        name: search,
        email: search,
      } : null)

      if (users.length < 1) {
        return res.end(JSON.stringify([]))
      }
  
      return res.end(JSON.stringify(users))
    },
  },

  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      if (!req.body || !req.body.name || !req.body.email) {
        return res
          .writeHead(400)
          .end('Invalid or missing user information.')
      }
  
      const { name, email } = req.body

      const users = database.select('users')
      
      const newUser = {
        id: randomUUID(),
        name,
        email
      }
  
      if (users.find(user => user.email === email)) {
        return res
          .writeHead(409)
          .end('User already exists.')
      }
  
      database.insert('users', newUser)
  
      return res
        .writeHead(201)
    },
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params

      try {
        database.delete('users', id)
      } catch (error) {
        return res
          .writeHead(404)
          .end()
      }

      return res
        .writeHead(204)
        .end()
    },
  },

  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { name, email } = req.body

      const users = database.select('users')

      if (users.find(user => user.email === email)) {
        return res
          .writeHead(409)
          .end('Email is already in use.')
      }

      try {
        database.update('users', id, { name, email })
      } catch (error) {
        console.log(error.message)

        return res
          .writeHead(404)
          .end()
      }

      return res
        .writeHead(204)
        .end()
    },
  },
]