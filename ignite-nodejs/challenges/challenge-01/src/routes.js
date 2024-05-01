import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from "./utils/build-route-path.js"

const database = new Database

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const { search } = req.query

      const tasks = database.select(
        'tasks',
        search && {
          title: search,
          description: search,
        }
      )

      return res.end(JSON.stringify(tasks))
    }
  },

  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      if (!req.body) {
        return res
          .writeHead(400)
          .end()
      }

      const { title, description } = req.body

      if (!title || !description) {
        return res
          .writeHead(400)
          .end('The request body is empty or incomplete.')
      }

      const newTask = {
        id: randomUUID(),
        title,
        description,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      database.insert('tasks', newTask)

      return res
        .writeHead(201)
        .end()
    }
  },

  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      if (!req.body) {
        return res
          .writeHead(400)
          .end('The request body is empty.')
      }

      const isUnecessaryInfo = Object.entries(req.body).some(
        attr => attr[0] !== 'title' && attr[0] !== 'description'
      )

      if (isUnecessaryInfo) {
        return res
          .writeHead(400)
          .end('The request body has more data than it needs.')
      }

      const { id } = req.params
      const { title, description } = req.body

      if (!title && !description) {
        return res
          .writeHead(400)
          .end('The request body has no title or description for the task.')
      }

      const updatedTaskInfos = {
        ...req.body,
        updatedAt: new Date(),
      }

      try {
        const updatedTask = database.update('tasks', id, updatedTaskInfos)

        return res
          .writeHead(204)
          .end(JSON.stringify(updatedTask))
      } catch (error) {
        console.log(error)

        return res
          .writeHead(404)
          .end(error.message)
      }
    }
  },

  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.select('tasks', { id })

      if (task.length < 1) {
        return res
          .writeHead(404)
          .end('Invalid ID')
      }

      const isTaskCompleted = task[0].completedAt !== null

      const completionStatus = isTaskCompleted ? {
        completedAt: null 
      } : {
        completedAt: new Date()
      }

      const updatedTask = database.update('tasks', id, completionStatus)

      return res
        .writeHead(204)
        .end(JSON.stringify(updatedTask))
    }
  },

  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params

      try {
        database.delete('tasks', id)

        return res
          .writeHead(204)
          .end()
      } catch (error) {
        console.log(error)

        return res
          .writeHead(404)
          .end(error.message)
      }
    }
  },
]
