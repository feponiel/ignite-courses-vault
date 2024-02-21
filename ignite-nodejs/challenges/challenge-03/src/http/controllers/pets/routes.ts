import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { getPet } from './get-pet'
import { fetchPets } from './fetch-pets'
import { register } from './register'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pets/:id', getPet)
  app.get('/pets', fetchPets)

  app.post('/pets', { onRequest: [verifyJwt] }, register)
}
