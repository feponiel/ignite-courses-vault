import { fastify } from 'fastify'
import { mealsRoutes } from './routes/meals'
import cookie from '@fastify/cookie'
import { usersRoutes } from './routes/users'
import { logRoutes } from './routes/log'

export const app = fastify()

app.register(cookie)
app.register(usersRoutes, {
  prefix: '/users',
})
app.register(mealsRoutes, {
  prefix: '/meals',
})
app.register(logRoutes, {
  prefix: '/log',
})
