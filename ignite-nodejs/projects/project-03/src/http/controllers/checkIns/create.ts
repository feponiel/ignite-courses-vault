import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const createCheckInParamsData = createCheckInParamsSchema.parse(req.params)
  const createCheckInBodyData = createCheckInBodySchema.parse(req.body)
  const createCheckInUseCase = makeCheckInUseCase()

  await createCheckInUseCase.execute({
    ...createCheckInParamsData,
    ...createCheckInBodyData,
    userId: req.user.sub,
  })

  return res.status(201).send()
}
