import { AppError } from '@/errors/app-error'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
    energy_level: z.number().min(1).max(5),
    independence_level: z.enum(['LOW', 'MEDIUM', 'HIGH']),
    adapted_climate: z.enum(['COLD', 'TEMPERATE', 'HEAT']),
    appropriate_environment: z.string(),
    care: z.string().array().default([]),
    presentation: z.string(),
    photos: z.string().array().default([]),
    city: z.string(),
    orgId: z.string(),
  })

  const registerPetBodyData = registerPetBodySchema.parse(req.body)

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    const { pet } = await registerPetUseCase.execute(registerPetBodyData)

    return res.status(201).send({ pet })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
