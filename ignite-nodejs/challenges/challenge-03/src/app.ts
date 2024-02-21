import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { orgsRoutes } from './http/controllers/orgs/routes'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { petsRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyCookie)
app.register(fastifyJwt, {
  secret: env.SECRET_KEY,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(orgsRoutes)
app.register(petsRoutes)

app.setErrorHandler((error, _, res) => {
  if (error instanceof ZodError) {
    return res.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // here we should log to an external tool like DataDog
  }

  return res.status(500).send()
})
