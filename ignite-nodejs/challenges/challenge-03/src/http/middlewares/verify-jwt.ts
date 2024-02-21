import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(req: FastifyRequest, res: FastifyReply) {
  try {
    if (!req.headers.authorization) {
      throw new Error()
    }

    await req.jwtVerify()
  } catch (error) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
