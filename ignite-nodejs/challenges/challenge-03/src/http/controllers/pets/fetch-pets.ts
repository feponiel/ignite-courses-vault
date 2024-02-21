import { AppError } from '@/errors/app-error'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchPets(req: FastifyRequest, res: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.number().optional(),
    breed: z.string().optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
    energy_level: z.number().min(1).max(5).optional(),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
    adapted_climate: z.enum(['COLD', 'TEMPERATE', 'HEAT']).optional(),
  })

  const filter = fetchPetsQuerySchema.parse(req.query)

  try {
    const fetchPetsUseCase = makeFetchPetsUseCase()

    const { pets } = await fetchPetsUseCase.execute(filter)

    return res.status(200).send({ pets })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
