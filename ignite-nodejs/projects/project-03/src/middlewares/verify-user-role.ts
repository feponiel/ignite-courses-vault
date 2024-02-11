import { AppError } from '@/errors/app-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export function verifyUserRole(roleToVerify: 'ADMIN' | 'MEMBER') {
  return async (req: FastifyRequest, res: FastifyReply) => {
    try {
      if (req.user.role !== roleToVerify) {
        throw new AppError('Unauthorized!', 401)
      }
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).send({ message: error.message })
      }

      throw error
    }
  }
}
