import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { database } from '../database'
import { checkIfSessionExists } from '../middlewares/check-if-session-exists'

export async function logRoutes(app: FastifyInstance) {
  app.post('/in', async (req, res) => {
    const session = req.cookies.session

    if (session) {
      res.status(403).send({ error: `You're already authenticated!` })
    }

    const loginReqBodySchema = z.object({
      email: z.string(),
    })

    const { email } = loginReqBodySchema.parse(req.body)

    const user = await database('users')
      .where({
        email,
      })
      .first()

    if (!user) {
      return res.status(404).send({ error: `User doesn't exist!` })
    }

    res.cookie('session', email, {
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    })
  })

  app.post(
    '/out',
    {
      preHandler: [checkIfSessionExists],
    },
    async (_, res) => {
      res.clearCookie('session').send({ message: 'Logged out!' })
    },
  )
}
