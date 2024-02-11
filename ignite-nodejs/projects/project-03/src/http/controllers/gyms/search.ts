import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeSearchGymUseCase } from '@/use-cases/factories/make-search-gym-use-case'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const searchGymQueryData = searchGymQuerySchema.parse(req.query)
  const searchGymUseCase = makeSearchGymUseCase()

  const { gyms } = await searchGymUseCase.execute(searchGymQueryData)

  return res.status(200).send({
    gyms,
  })
}
