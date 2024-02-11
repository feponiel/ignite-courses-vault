import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { AppError } from '@/errors/app-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const authenticateBodyData = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute(authenticateBodyData)

    const token = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await res.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
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
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({
        message: error.message,
      })
    }

    throw error
  }
}
