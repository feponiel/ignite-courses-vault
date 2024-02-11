import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const token = await res.jwtSign(
    {
      role: req.user.role,
    },
    {
      sign: {
        sub: req.user.sub,
      },
    },
  )

  const refreshToken = await res.jwtSign(
    {
      role: req.user.role,
    },
    {
      sign: {
        sub: req.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return res
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/', // todas as rotas do site terão acesso a esse cookie
      secure: true, // o front-end só consegue enviar esse cookie criado para o back-end se for através de uma conexão HTTPS (segura)
      sameSite: 'strict', // o front-end só transitará o cookie para sites que pertencerem ao mesmo domínio/site que o criou
      httpOnly: true, // o front-end não terá acesso ao cookie através de scripts do javascript (exemplo: getCookie())
    })
    .send({
      token,
    })
}
