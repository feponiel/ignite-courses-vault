import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { database } from '../database'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/', async (req, res) => {
    const userSchema = z.object({
      name: z.string(),
      email: z.string(),
    })

    const { name, email } = userSchema.parse(req.body)

    const users = await database('users')
    const userAlreadyExists = users.find((user) => user.email === email)

    if (userAlreadyExists) {
      return res.status(409).send({ error: 'User already exists!' })
    }

    res.cookie('session', email, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })

    await database('users').insert({
      id: randomUUID(),
      name,
      email,
    })

    res.status(201).send()
  })
}
