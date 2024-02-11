import { AppError } from '@/errors/app-error'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(req: FastifyRequest, res: FastifyReply) {
  try {
    try {
      if (!req.headers.authorization) {
        throw new Error()
      }

      await req.jwtVerify()
    } catch {
      throw new AppError('Unauthorized!', 401)
    }
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      })
    }

    throw error
  }
}
