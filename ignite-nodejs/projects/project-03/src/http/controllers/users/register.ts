import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '@/errors/app-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const userBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const userBodyData = userBodySchema.parse(req.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute(userBodyData)
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      })
    }

    throw error
  }

  return res.status(201).send()
}
