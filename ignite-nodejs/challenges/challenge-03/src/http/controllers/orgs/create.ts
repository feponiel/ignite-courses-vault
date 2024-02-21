import { AppError } from '@/errors/app-error'
import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const orgBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    cep: z.string(),
    address: z.string(),
    whatsapp_number: z.string(),
    manager: z.string(),
  })

  const orgBodyData = orgBodySchema.parse(req.body)

  try {
    const createOrgUseCase = makeCreateOrgUseCase()

    const { org } = await createOrgUseCase.execute(orgBodyData)

    Reflect.deleteProperty(org, 'password_hash')

    return res.status(201).send({ org })
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ message: error.message })
    }

    throw error
  }
}
