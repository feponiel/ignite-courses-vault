import { FastifyInstance } from 'fastify'
import { database } from '../database'
import { z } from 'zod'
import { randomUUID } from 'crypto'
import { checkIfSessionIdExists } from '../middlewares/check-if-session-id-exists'

export async function transactionsRoute(app: FastifyInstance) {
  app.addHook('preHandler', async (req) => {
    console.log(`[${req.method}] ${req.url}`)
  })

  app.get(
    '/',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (req, res) => {
      const { sessionId } = req.cookies

      const transactions = await database('transactions')
        .select('*')
        .where('session_id', sessionId)

      return res.send({ transactions })
    },
  )

  app.get(
    '/:id',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (req, res) => {
      const { sessionId } = req.cookies
      const requestParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = requestParamsSchema.parse(req.params)

      const transaction = await database('transactions')
        .select('*')
        .where({
          session_id: sessionId,
          id,
        })
        .first()

      return res.send({ transaction })
    },
  )

  app.get(
    '/summary',
    {
      preHandler: [checkIfSessionIdExists],
    },
    async (req, res) => {
      const { sessionId } = req.cookies

      const summary = await database('transactions')
        .sum('amount', {
          as: 'amount',
        })
        .where('session_id', sessionId)
        .first()

      return res.send({ summary })
    },
  )

  app.post('/', async (req, res) => {
    const transactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = transactionBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      res.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await database('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return res.status(201).send()
  })
}
