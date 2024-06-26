import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await res.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {},
    {
      sign: {
        sub: req.user.sub,
        expiresIn: '7d',
      },
    },
  )

  res
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: 'strict',
      httpOnly: true,
    })
    .send({ token })
}
