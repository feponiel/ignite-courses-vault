import { FastifyReply, FastifyRequest } from 'fastify'

export async function checkIfSessionExists(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const session = req.cookies.session

  if (!session) {
    return res.status(401).send({
      error: 'Unauthorized!',
    })
  }
}
