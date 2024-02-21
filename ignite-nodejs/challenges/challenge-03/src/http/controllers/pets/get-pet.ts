import { AppError } from '@/errors/app-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getPet(req: FastifyRequest, res: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = getPetParamsSchema.parse(req.params)

  try {
    const getPetUseCase = makeGetPetUseCase()

    const { pet } = await getPetUseCase.execute(id)

    return res.status(200).send({ pet })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
