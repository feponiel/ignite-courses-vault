import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateOrg(app: FastifyInstance) {
  const createOrgResponse = await request(app.server).post('/orgs').send({
    name: 'Test Org',
    email: 'test@example.com',
    password: '123456',
    whatsapp_number: '+55 00-000000000',
    cep: '00000001',
    address: 'Test Street, 001, Non-existent City,',
    manager: 'Test Manager',
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'test@example.com',
    password: '123456',
  })

  const { id } = createOrgResponse.body.org
  const { token } = authResponse.body

  return {
    id,
    token,
  }
}
