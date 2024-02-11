import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserCheckInsUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const checkInHistoryQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const checkInHistoryQueryData = checkInHistoryQuerySchema.parse(req.params)
  const userCheckInHistoryUseCase = makeFetchUserCheckInsUseCase()

  const { checkIns } = await userCheckInHistoryUseCase.execute({
    userId: req.user.sub,
    ...checkInHistoryQueryData,
  })

  return res.status(200).send({
    checkIns,
  })
}
